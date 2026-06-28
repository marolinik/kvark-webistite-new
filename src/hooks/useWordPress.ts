import { useQuery } from "@tanstack/react-query";
import { fetchAllPosts, fetchPostBySlug, type NewsItem } from "@/lib/wordpress";

export function useAllPosts() {
  const { data, isLoading, error } = useQuery<NewsItem[]>({
    queryKey: ["posts", "all"],
    queryFn: () => fetchAllPosts(),
  });

  return {
    items: data ?? [],
    loading: isLoading,
    error: error ? (error as Error).message : null,
  };
}

export function usePostBySlug(slug: string | undefined) {
  const { data, isLoading, error } = useQuery<NewsItem | null>({
    queryKey: ["posts", "slug", slug],
    queryFn: () => fetchPostBySlug(slug!),
    enabled: !!slug,
  });

  return {
    item: data ?? null,
    loading: isLoading,
    error: error ? (error as Error).message : null,
  };
}

export function useRelatedPosts(excludeSlug: string, limit = 3) {
  const { data, isLoading } = useQuery<NewsItem[]>({
    queryKey: ["posts", "all"],
    queryFn: () => fetchAllPosts(),
  });

  const items = (data ?? [])
    .filter((p) => p.slug !== excludeSlug)
    .slice(0, limit);

  return { items, loading: isLoading };
}
