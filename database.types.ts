export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      addons: {
        Row: {
          active: boolean | null
          code: string
          created_at: string | null
          description: string | null
          id: string
          monthly_price_cents: number
          name: string
        }
        Insert: {
          active?: boolean | null
          code: string
          created_at?: string | null
          description?: string | null
          id?: string
          monthly_price_cents: number
          name: string
        }
        Update: {
          active?: boolean | null
          code?: string
          created_at?: string | null
          description?: string | null
          id?: string
          monthly_price_cents?: number
          name?: string
        }
        Relationships: []
      }
      applications: {
        Row: {
          cover_letter: string | null
          created_at: string | null
          id: string
          job_id: string | null
          resume_url: string | null
          user_id: string | null
        }
        Insert: {
          cover_letter?: string | null
          created_at?: string | null
          id?: string
          job_id?: string | null
          resume_url?: string | null
          user_id?: string | null
        }
        Update: {
          cover_letter?: string | null
          created_at?: string | null
          id?: string
          job_id?: string | null
          resume_url?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "applications_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "jobs"
            referencedColumns: ["id"]
          },
        ]
      }
      companies: {
        Row: {
          created_at: string | null
          id: string
          logo_url: string | null
          name: string
          website: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          logo_url?: string | null
          name: string
          website?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          logo_url?: string | null
          name?: string
          website?: string | null
        }
        Relationships: []
      }
      invitations: {
        Row: {
          created_at: string | null
          email: string
          id: string
          project_id: string | null
          status: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          id?: string
          project_id?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: string
          project_id?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "invitations_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      jobs: {
        Row: {
          company_id: string | null
          created_at: string | null
          description: string
          id: string
          location: string
          salary_range: string | null
          title: string
          type: string
          user_id: string | null
        }
        Insert: {
          company_id?: string | null
          created_at?: string | null
          description: string
          id?: string
          location: string
          salary_range?: string | null
          title: string
          type: string
          user_id?: string | null
        }
        Update: {
          company_id?: string | null
          created_at?: string | null
          description?: string
          id?: string
          location?: string
          salary_range?: string | null
          title?: string
          type?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "jobs_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      project_addons: {
        Row: {
          activated_at: string | null
          addon_code: string
          canceled_at: string | null
          created_at: string | null
          id: string
          project_id: string
          status: string
          stripe_subscription_item_id: string | null
          updated_at: string | null
        }
        Insert: {
          activated_at?: string | null
          addon_code: string
          canceled_at?: string | null
          created_at?: string | null
          id?: string
          project_id: string
          status?: string
          stripe_subscription_item_id?: string | null
          updated_at?: string | null
        }
        Update: {
          activated_at?: string | null
          addon_code?: string
          canceled_at?: string | null
          created_at?: string | null
          id?: string
          project_id?: string
          status?: string
          stripe_subscription_item_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "project_addons_addon_code_fkey"
            columns: ["addon_code"]
            isOneToOne: false
            referencedRelation: "addons"
            referencedColumns: ["code"]
          },
          {
            foreignKeyName: "project_addons_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      projects: {
        Row: {
          approval_mode: string | null
          autonomy_mode: string | null
          compliance_mode: boolean | null
          created_at: string | null
          earned_credits_months: number | null
          global_autonomy_enabled: boolean | null
          id: string
          name: string
          owner_id: string
          plan_type: string | null
          sas_permissions: Json | null
          slug: string
          status: string | null
          stripe_customer_id: string | null
          stripe_subscription_id: string | null
          updated_at: string | null
        }
        Insert: {
          approval_mode?: string | null
          autonomy_mode?: string | null
          compliance_mode?: boolean | null
          created_at?: string | null
          earned_credits_months?: number | null
          global_autonomy_enabled?: boolean | null
          id?: string
          name: string
          owner_id: string
          plan_type?: string | null
          sas_permissions?: Json | null
          slug: string
          status?: string | null
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          updated_at?: string | null
        }
        Update: {
          approval_mode?: string | null
          autonomy_mode?: string | null
          compliance_mode?: boolean | null
          created_at?: string | null
          earned_credits_months?: number | null
          global_autonomy_enabled?: boolean | null
          id?: string
          name?: string
          owner_id?: string
          plan_type?: string | null
          sas_permissions?: Json | null
          slug?: string
          status?: string | null
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      system_actions: {
        Row: {
          action_type: string
          approval_state: string | null
          approved_by: string | null
          confidence_score: number
          created_at: string | null
          executed_at: string | null
          id: string
          note: string | null
          project_id: string
          reverted: boolean | null
          risk: string
        }
        Insert: {
          action_type: string
          approval_state?: string | null
          approved_by?: string | null
          confidence_score: number
          created_at?: string | null
          executed_at?: string | null
          id?: string
          note?: string | null
          project_id: string
          reverted?: boolean | null
          risk: string
        }
        Update: {
          action_type?: string
          approval_state?: string | null
          approved_by?: string | null
          confidence_score?: number
          created_at?: string | null
          executed_at?: string | null
          id?: string
          note?: string | null
          project_id?: string
          reverted?: boolean | null
          risk?: string
        }
        Relationships: [
          {
            foreignKeyName: "system_actions_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      todos: {
        Row: {
          created_at: string | null
          id: string
          is_completed: boolean | null
          task: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          is_completed?: boolean | null
          task: string
        }
        Update: {
          created_at?: string | null
          id?: string
          is_completed?: boolean | null
          task?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
