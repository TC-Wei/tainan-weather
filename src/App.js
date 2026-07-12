import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios'


function App() {
  // === 三個 state 抽屜 ===
  const[data,setData]= useState(null)              // 天氣資料（API 回來的一整包，還沒來之前是 null）
  const[error,setError]= useState(null)            // 錯誤訊息（沒出錯是 null，出錯放提示文字）
  const [updatedAt,setUpdatedAt]= useState(null)     // 最後更新時間（每次抓成功蓋一次時間戳）
  const [isDark,setIsDark]= useState(false)        // 夜間模式開關（false=白天，true=晚上）
  const [city,setCity] = useState({name:'台南',lat:22.9959,lon:120.2136})
  useEffect(()=>{
    // 定義「抓天氣」這個動作（只是食譜，還沒煮）
    const fetchWeather = () =>{
     axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${city.lat}&longitude=${city.lon}&current=temperature_2m,relative_humidity_2m,weather_code&timezone=Asia%2FTaipei`)
    .then(res=>{         
      setData(res.data)                             // 存進 data → 畫面重畫
      setError(null)                                // null = 沒有錯誤 = 降旗
      setUpdatedAt(new Date().toLocaleString())     // 蓋上「現在時間」的時間戳
    })
    .catch(err=>{console.error(err)                // 失敗：印出錯誤原因
    setError('資料載入失敗')                        // 通知畫面「失敗了」
  })
}

    fetchWeather()                                 // 頁面載入先抓一次
    const timer = setInterval(fetchWeather,60000)  // 之後每60秒自動再抓（60000 毫秒）
    return(()=>{clearInterval(timer)})             // cleanup：離開頁面時關掉計時器，避免在背景一直跑
  },[city])                                        //city 變了就重新抓
  const weatherCode = (code)=>{
  if(code ===0) return '☀️晴天'
  if(code <=3)  return '⛅多雲'
  if(code >=61)  return '🌧️ 下雨'
  return '🌫️ 其他'
  }                                           

  return (
    <div className={isDark ? 'App dark' : 'App light'}>
      <header className="App-header">
        <div className='weather-card'>
          <div className='card-top'>
          <h1>{`${city.name}天氣`}</h1>
          <button className="theme-toggle" onClick={()=>setIsDark(!isDark)}>{isDark ? '☀️' : '🌙'}</button>
          </div>
        <div className='city'>
          <button className={city.name === '台南' ? 'active': ''} 
          onClick={()=>setCity({name:'台南',lat:'22.9959',lon:'120.2136'})}>台南</button>
          <button className={city.name === '高雄' ? 'active': ''} 
          onClick={()=>setCity({name:'高雄',lat:'22.6273',lon:'120.3014'})}>高雄</button>
          <button className={city.name === '台北' ? 'active': ''} 
          onClick={()=>setCity({name:'台北',lat:'25.0330',lon:'121.5654'})}>台北</button>
        </div>
        {/* 三態判斷：有錯誤→顯示錯誤 / 資料到了→顯示數值 / 都還沒→載入中 */}
        <div className='temp'>
        <h2>溫度: {error ? '資料載入失敗' : data ? `${data.current.temperature_2m}°C` : "載入中..."}</h2>
        </div>
        <div className='meta'>
        <h2><span>濕度: {error ? '資料載入失敗' : data ? `${data.current.relative_humidity_2m}%` : "載入中..."}</span></h2>
        <h2><span>天氣: {data ? weatherCode(data.current.weather_code): "載入中..."}</span></h2>
        </div>
        <p className="updated">最後更新:{updatedAt}</p>
        </div>

      </header>
    </div>
  );
}

export default App;
