import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react'
import supabase from '../supabase'

export const supabaseApi = createApi({
  reducerPath: 'supabase',
  baseQuery: fakeBaseQuery(),
  tagTypes: ['Task'],
  endpoints: build => ({
    getUser: build.query({
      queryFn: async ({ login, password }) => {
        const { data, error } = await supabase
          .from('users')
          .select('*')
          .eq('login', login)
          .eq('password', password)
          .single()
        return error ? { error } : { data }
      },
    }),
    addUser: build.mutation({
      queryFn: async ({ login, password, username }) => {
        const { data: existingUser, error: checkError } = await supabase
          .from('users')
          .select('id')
          .eq('login', login)
          .single()

        if (existingUser) {
          return { error: 'Пользователь с таким логином уже существует' }
        }
        if (checkError && checkError.code !== 'PGRST116') {
          return { error: checkError }
        }

        const { data, error } = await supabase
          .from('users')
          .insert([
            { login, password, username },
          ])
          .select()
          .single()
        return error ? { error } : { data }
      },
    }),

    getTasks: build.query({
      queryFn: async ({ userId }) => {
        const { data, error } = await supabase
          .from('tasks')
          .select('*')
          .eq('userId', userId)
          .order('created_at', { ascending: false })
        return error ? { error } : { data }
      },
      providesTags: (result) =>
        result
          ? [
            ...result.map(({ id }) => ({ type: 'Task' as const, id })), // 🧩 индивидуальные теги
            { type: 'Task', id: 'LIST' },
          ]
          : [{ type: 'Task', id: 'LIST' }],
    }),
    addTask: build.mutation({
      queryFn: async ({ userId, newTask }) => {
        const { data, error } = await supabase
          .from('tasks')
          .insert([{ 
            userId: userId,
            text: newTask.text,
            priority: newTask.priority,
          }])
        return error ? { error } : { data }
      },
      invalidatesTags: (result, error, { id }) => [{ type: 'Task', id }],
    }),
    toggleCompletedTask: build.mutation({
      queryFn: async ({ id, completed }) => {
        const { data, error } = await supabase
          .from('tasks')
          .update({ completed: !completed })
          .eq('id', id)
          .select()
        return error ? { error } : { data }
      },
      invalidatesTags: (result, error, { id }) => [{ type: 'Task', id }],
    }),
    editTextTask: build.mutation({
      queryFn: async ({ id, text }) => {
        const { data, error } = await supabase
          .from('tasks')
          .update({ text })
          .eq('id', id)
          .select()
          .single()
        return error ? { error } : { data }
      },
      invalidatesTags: (result, error, { id }) => [{ type: 'Task', id }],
    }),
    editPriorityTask: build.mutation({
      queryFn: async ({ id, priority }) => {
        const { data, error } = await supabase
          .from('tasks')
          .update({ priority })
          .eq('id', id)
          .select()
        return error ? { error } : { data }
      },
      invalidatesTags: (result, error, { id }) => [{ type: 'Task', id }],
    }),
    removeTask: build.mutation({
      queryFn: async ({ id }) => {
        const { error } = await supabase
          .from('tasks')
          .delete()
          .eq('id', id)
        return error ? { error } : { data: { success: true } }
      },
      invalidatesTags: (result, error, { id }) => [{ type: 'Task', id }],
    }),
  }),
})

export const { 
  useGetUserQuery, 
  useLazyGetUserQuery, 
  useAddUserMutation, 
  useGetTasksQuery, 
  useAddTaskMutation,
  useToggleCompletedTaskMutation,
  useEditTextTaskMutation,
  useEditPriorityTaskMutation,
  useRemoveTaskMutation,
} = supabaseApi

export default supabaseApi
