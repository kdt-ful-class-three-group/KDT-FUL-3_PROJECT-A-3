'use client'

import { useEffect, useState } from "react"
import axios from "axios"

interface FavoriteButtonProps {
  symbol: string
}

export function FavoriteButton({ symbol }: FavoriteButtonProps) {
  const [isFavorite, setIsFavorite] = useState(false)

  useEffect(() => {
    const favoritesCheck = async () => {
      const res = await axios.post('http://localhost:8008/favorites/check',
        { symbol: symbol },
        { withCredentials: true })


      if (res.data.status === true) {
        setIsFavorite(true);
      } else {
        setIsFavorite(false);
      }
    }

    favoritesCheck();
  }, [])




  // 관심 여부 확인
  useEffect(() => {
    const checkFavorite = async () => {
      try {
        const res = await axios.post('http://localhost:8008/favorites/check',
          { symbol },
          { withCredentials: true })
        setIsFavorite(res.data.status === true)
      } catch (err) {
        console.error(err)
      }
    }

    checkFavorite()
  }, [symbol])

  const toggleFavorite = async () => {
    try {
      const url = isFavorite
        ? 'http://localhost:8008/favorites/delete'
        : 'http://localhost:8008/favorites'

      const res = await axios.post(url, { symbol }, { withCredentials: true })
      console.log(res.data)
      setIsFavorite(!isFavorite) // 상태만 토글 (리로드 필요 없음)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <button onClick={toggleFavorite}>
      {isFavorite ? `${symbol} 관심해제` : `${symbol} 관심등록`}
    </button>
  )
}