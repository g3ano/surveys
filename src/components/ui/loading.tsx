export default function Loading({ isLoading = false }: { isLoading: boolean }) {
  return (
    <>
      {isLoading && (
        <div>
          <span>loading...</span>
        </div>
      )}
    </>
  );
}
