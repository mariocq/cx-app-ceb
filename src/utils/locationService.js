/**
 * 全局定位单例
 * 注：先在login 初始化
 */

// 定时器
let locationTimer;
// 当前位置
let currentPosition = null;
// 间隔时间
const time = 5000;

const initLocation = () => {
  updatePosition();

  locationTimer = setInterval(() => {
    updatePosition();
  }, time);
}

const updatePosition = () => {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      const positionData = position.coords;
      // 经度：positionData.longitude
      // 纬度：positionData.latitude
      currentPosition = positionData;
    },
    (error) => {
      console.warn('失败：' + JSON.stringify(error.message))
    }, {
      // 提高精确度，但是获取的速度会慢一点
      enableHighAccuracy: true,
      // 设置获取超时的时间20秒
      timeout: 20000,
      // 示应用程序的缓存时间，每次请求都是立即去获取一个全新的对象内容
      // maximumAge: 1000
    }
  )
}

const getPosition = () => {
  return currentPosition;
}

export default {
  initLocation,
  getPosition,
};
