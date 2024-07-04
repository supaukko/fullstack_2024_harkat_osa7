import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import userService from '../services/users'

const KEY = 'users'

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
const useUsers = () => {
  const queryClient = useQueryClient()
  return useQuery({
    queryKey: [KEY],
    queryFn: userService.getAll,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [KEY] }),
    retry: 1
  })
}

const useUser = (id) => {
  const queryClient = useQueryClient()
  const users = queryClient.getQueryData(KEY)
  return users.find((user) => user.id === id)
}

const useUser2 = (id) =>
  useUsers((users) => users.find((user) => user.id === id))

const useUser3 = (id) => useQuery([KEY, id], () => userService.get(id))

export { useUsers, useUser, useUser2, useUser3 }
