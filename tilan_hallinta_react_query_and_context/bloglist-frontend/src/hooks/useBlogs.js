import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import blogService from '../services/blogs'

const KEY = 'blogs'

const useInvalidateBlogs = () => {
  const queryClient = useQueryClient()
  queryClient.invalidateQueries({ queryKey: [KEY] })
}

/**
 * Datan hakeminen palvelimelta tapahtuu Axiosin get-metodilla.
 * Axiosin metodikutsu on kääritty useQuery-funktiolla muodostetuksi kyselyksi.
 * Funktiokutsun ensimmäisenä parametrina on merkkijono, joka toimii
 * avaimena määriteltyyn kyselyyn.
 *
 * Funktion useQuery paluuarvo on olio, joka kertoo kyselyn tilan
 */
const useBlogs = () => {
  const queryClient = useQueryClient()
  return useQuery({
    queryKey: [KEY],
    queryFn: blogService.getAll,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [KEY] }),
    retry: 1
  })
}

const useUpdateBlog = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({ id, data }) => await blogService.update(id, data),
    onSuccess: (updatedBlog) => {
      const previousBlogs = queryClient.getQueryData({ queryKey: [KEY] })
      // console.log('useUpdateBlog', updatedBlog, previousBlogs)
      if (previousBlogs) {
        queryClient.setQueryData(KEY, (previousBlogs) =>
          previousBlogs.map((item) =>
            item.id === updatedBlog.id ? { ...item, ...updatedBlog } : item
          )
        )
      } else {
        queryClient.invalidateQueries({ queryKey: [KEY] })
      }
    },
    onError: (error) => {
      console.error('Update error:', error.response.data.error)
    }
  })
}

const useCreateBlog = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: blogService.create,
    onSuccess: (newBlog) => {
      const previousBlogs = queryClient.getQueryData(KEY)

      if (previousBlogs) {
        queryClient.setQueryData({ queryKey: [KEY] }, (previousBlogs) => [
          ...previousBlogs,
          ...newBlog
        ])
      } else {
        queryClient.invalidateQueries({ queryKey: [KEY] })
      }
    },
    onError: (error) => {
      console.error('Create error:', error.response.data.error)
    }
  })
}

const useRemoveBlog = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: blogService.remove,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [KEY] }),
    onError: (error) => {
      console.error('Update error:', error.response.data.error)
    }
  })
}

export {
  useInvalidateBlogs,
  useBlogs,
  useUpdateBlog,
  useCreateBlog,
  useRemoveBlog
}
