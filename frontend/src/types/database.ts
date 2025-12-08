export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          name: string
          role: 'student' | 'teacher' | 'staff' | 'parent' | 'admin'
          department: string | null
          student_id: string | null
          employee_id: string | null
          child_id: string | null
          phone: string | null
          address: string | null
          join_date: string | null
          status: 'active' | 'inactive' | 'suspended'
          avatar_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          email: string
          name: string
          role: 'student' | 'teacher' | 'staff' | 'parent' | 'admin'
          department?: string | null
          student_id?: string | null
          employee_id?: string | null
          child_id?: string | null
          phone?: string | null
          address?: string | null
          join_date?: string | null
          status?: 'active' | 'inactive' | 'suspended'
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          name?: string
          role?: 'student' | 'teacher' | 'staff' | 'parent' | 'admin'
          department?: string | null
          student_id?: string | null
          employee_id?: string | null
          child_id?: string | null
          phone?: string | null
          address?: string | null
          join_date?: string | null
          status?: 'active' | 'inactive' | 'suspended'
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      fee_details: {
        Row: {
          id: string
          user_id: string
          type: string
          amount: number
          due_date: string
          status: 'paid' | 'pending' | 'overdue' | 'partial'
          semester: string
          description: string | null
          paid_amount: number | null
          payment_date: string | null
          receipt_number: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          type: string
          amount: number
          due_date: string
          status?: 'paid' | 'pending' | 'overdue' | 'partial'
          semester: string
          description?: string | null
          paid_amount?: number | null
          payment_date?: string | null
          receipt_number?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          type?: string
          amount?: number
          due_date?: string
          status?: 'paid' | 'pending' | 'overdue' | 'partial'
          semester?: string
          description?: string | null
          paid_amount?: number | null
          payment_date?: string | null
          receipt_number?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      academic_records: {
        Row: {
          id: string
          user_id: string
          subject: string
          subject_code: string
          credits: number
          grade: string
          marks: number
          max_marks: number
          semester: string
          year: string
          teacher: string
          attendance: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          subject: string
          subject_code: string
          credits: number
          grade: string
          marks: number
          max_marks: number
          semester: string
          year: string
          teacher: string
          attendance: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          subject?: string
          subject_code?: string
          credits?: number
          grade?: string
          marks?: number
          max_marks?: number
          semester?: string
          year?: string
          teacher?: string
          attendance?: number
          created_at?: string
          updated_at?: string
        }
      }
      documents: {
        Row: {
          id: string
          user_id: string
          name: string
          type: string
          status: 'approved' | 'pending' | 'rejected' | 'processing'
          request_date: string
          approval_date: string | null
          download_url: string | null
          description: string | null
          fees: number | null
          estimated_days: number | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          type: string
          status?: 'approved' | 'pending' | 'rejected' | 'processing'
          request_date: string
          approval_date?: string | null
          download_url?: string | null
          description?: string | null
          fees?: number | null
          estimated_days?: number | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          type?: string
          status?: 'approved' | 'pending' | 'rejected' | 'processing'
          request_date?: string
          approval_date?: string | null
          download_url?: string | null
          description?: string | null
          fees?: number | null
          estimated_days?: number | null
          created_at?: string
          updated_at?: string
        }
      }
      scholarships: {
        Row: {
          id: string
          user_id: string
          name: string
          type: 'merit' | 'need' | 'sports' | 'cultural'
          amount: number
          status: 'applied' | 'under_review' | 'approved' | 'rejected'
          application_date: string
          deadline: string
          description: string
          eligibility: string[]
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          type: 'merit' | 'need' | 'sports' | 'cultural'
          amount: number
          status?: 'applied' | 'under_review' | 'approved' | 'rejected'
          application_date: string
          deadline: string
          description: string
          eligibility: string[]
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          type?: 'merit' | 'need' | 'sports' | 'cultural'
          amount?: number
          status?: 'applied' | 'under_review' | 'approved' | 'rejected'
          application_date?: string
          deadline?: string
          description?: string
          eligibility?: string[]
          created_at?: string
          updated_at?: string
        }
      }
      notifications: {
        Row: {
          id: string
          title: string
          message: string
          type: 'info' | 'warning' | 'success' | 'error'
          timestamp: string
          read: boolean
          target_role: string[]
          priority: 'low' | 'medium' | 'high'
          action_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          message: string
          type?: 'info' | 'warning' | 'success' | 'error'
          timestamp: string
          read?: boolean
          target_role: string[]
          priority?: 'low' | 'medium' | 'high'
          action_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          message?: string
          type?: 'info' | 'warning' | 'success' | 'error'
          timestamp?: string
          read?: boolean
          target_role?: string[]
          priority?: 'low' | 'medium' | 'high'
          action_url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      academic_materials: {
        Row: {
          id: string
          title: string
          type: 'textbook' | 'pdf' | 'video' | 'lab_manual' | 'assignment'
          subject: string
          semester: string
          download_url: string | null
          file_size: string | null
          upload_date: string
          description: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          type: 'textbook' | 'pdf' | 'video' | 'lab_manual' | 'assignment'
          subject: string
          semester: string
          download_url?: string | null
          file_size?: string | null
          upload_date: string
          description?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          type?: 'textbook' | 'pdf' | 'video' | 'lab_manual' | 'assignment'
          subject?: string
          semester?: string
          download_url?: string | null
          file_size?: string | null
          upload_date?: string
          description?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      tasks: {
        Row: {
          id: string
          user_id: string
          title: string
          description: string
          location: string
          priority: 'low' | 'medium' | 'high'
          status: 'pending' | 'in_progress' | 'completed'
          assigned_date: string
          due_date: string
          completed_date: string | null
          assigned_by: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          description: string
          location: string
          priority?: 'low' | 'medium' | 'high'
          status?: 'pending' | 'in_progress' | 'completed'
          assigned_date: string
          due_date: string
          completed_date?: string | null
          assigned_by: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          title?: string
          description?: string
          location?: string
          priority?: 'low' | 'medium' | 'high'
          status?: 'pending' | 'in_progress' | 'completed'
          assigned_date?: string
          due_date?: string
          completed_date?: string | null
          assigned_by?: string
          created_at?: string
          updated_at?: string
        }
      }
      emails: {
        Row: {
          id: string
          from_user_id: string
          to_user_ids: string[]
          cc_user_ids: string[] | null
          subject: string
          body: string
          timestamp: string
          read: boolean
          starred: boolean
          attachments: string[] | null
          folder: 'inbox' | 'sent' | 'drafts' | 'trash'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          from_user_id: string
          to_user_ids: string[]
          cc_user_ids?: string[] | null
          subject: string
          body: string
          timestamp: string
          read?: boolean
          starred?: boolean
          attachments?: string[] | null
          folder?: 'inbox' | 'sent' | 'drafts' | 'trash'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          from_user_id?: string
          to_user_ids?: string[]
          cc_user_ids?: string[] | null
          subject?: string
          body?: string
          timestamp?: string
          read?: boolean
          starred?: boolean
          attachments?: string[] | null
          folder?: 'inbox' | 'sent' | 'drafts' | 'trash'
          created_at?: string
          updated_at?: string
        }
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