import { useEffect, useRef } from "react"

export const useUpdateEffect = (callback, dependencies) => {
  const firstRenderRef = useRef(true);

  useEffect(() => {
    firstRenderRef.current ? firstRenderRef.current = false : callback();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies)
}