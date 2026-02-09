import { createClient } from '@/utils/supabase/server';
import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';

export default async function JobDetailsPage({ params }: { params: { id: string } }) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: job, error } = await supabase
    .from('jobs')
    .select(`
      *,
      companies (
        name,
        website,
        logo_url
      )
    `)
    .eq('id', id)
    .single();

  if (error || !job) {
    notFound();
  }

  return (
    <div className="container mx-auto py-10 max-w-4xl">
      <Link href="/jobs" className="text-sm text-muted-foreground hover:underline mb-4 block">
        ← Back to Jobs
      </Link>
      
      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-3xl">{job.title}</CardTitle>
              <div className="flex items-center gap-2 text-muted-foreground">
                <span>{job.companies?.name}</span>
                <span>•</span>
                <span>{job.location}</span>
                <span>•</span>
                <span>{job.type}</span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="prose dark:prose-invert max-w-none whitespace-pre-wrap">
                {job.description}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Apply Now</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1">
                <p className="text-sm font-medium">Salary Range</p>
                <p className="text-lg font-semibold">{job.salary_range || 'Not specified'}</p>
              </div>
              <Link href={`/jobs/${job.id}/apply`} className="block w-full">
                <Button className="w-full">Apply for this position</Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>About {job.companies?.name}</CardTitle>
            </CardHeader>
            <CardContent>
              {job.companies?.website && (
                <a 
                  href={job.companies.website} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  Visit Website
                </a>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
