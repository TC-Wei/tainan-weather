# 台南天氣

一個顯示天氣的網頁，有濕度、當下天氣、七日預報

線上版：https://tainan-weather.vercel.app

## 功能
- 城市切換
- 天氣狀況
- 深淺色模式
- 七日最高溫最低溫顯示
- 每 60 秒自動更新

## 技術棧
- React
- axios
- open-meteo API
- Vercel

## 學到的東西
- map 渲染平行陣列
- useEffect決定什麼時候抓取（這個網頁是刷新跟60秒會抓取一次）
- axios 負責「怎麼抓取」，成功是 .then、失敗是 .catch