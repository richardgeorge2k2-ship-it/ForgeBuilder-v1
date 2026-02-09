import { createClient } from '@/utils/supabase/server';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default async function JobsPage() {
  const supabase = await createClient();

  const { data: jobs, error } = await supabase
    .from('jobs')
    .select(`
      *,
      companies (
        name,
        logo_url
      )
    `)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching jobs:', error);
  }

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Job Board</h1>
        <Link href="/jobs/new">
          <Button>Post a Job</Button>
        </Link>
      </div>

      <div className="grid gap-6">
        {jobs?.map((job) => (
          <Card key={job.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-2xl">{job.title}</CardTitle>
                  <p className="text-muted-foreground">
                    {job.companies?.name} • {job.location}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">{job.salary_range}</p>
                  <p className="text-sm text-muted-foreground">{job.type}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="line-clamp-3 mb-4">{job.description}</p>
              <Link href={`/jobs/${job.id}`}>
                <Button variant="outline">View Details</Button>
              </Link>
            </CardContent>
          </Card>
        ))}
        {jobs?.length === 0 && (
          <p className="text-center text-muted-foreground py-10">No jobs found. Be the first to post one!</p>
        )}
      </div>
    </div>
  );
}
