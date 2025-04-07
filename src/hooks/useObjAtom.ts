import { Atom, ExtractAtomValue, PrimitiveAtom, useAtom, useAtomValue } from 'jotai'
import type { Dispatch, SetStateAction } from 'react'
import { useCallback, useRef } from 'react'

type GetStateAction<S> = () => S
type Options = Parameters<typeof useAtomValue>[1]

function useObjAtom<S>(atom: PrimitiveAtom<S>, options?: Options) {
  const [state, setState] = useAtom(atom, options)
  const stateRef = useRef(state)
  stateRef.current = state

  const getState = useCallback(() => stateRef.current, [])

  return { value: state, set: setState, get: getState }
}

export default useObjAtom
