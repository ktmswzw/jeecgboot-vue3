import * as Cesium from 'cesium';

class TrackMatte {
  constructor(options) {
    this._viewer = options.viewer;
    // 半径
    this._radius = options.radius;
    // 扫描扇形颜色
    this._color = options.color;
    this.colorWall = options.colorWall;
    // 扫描速度
    this._speed = options.speed;
    //高度
    this._height = options.height;
    // 中心点坐标经纬度
    (this._cenLon = options.position[0]), (this._cenLat = options.position[1]), (this.heading = 0);
    this.positionArr = this.calculatePane(options.position[0], options.position[1], options.radius, 0, this._height); //储存脏数据
    this.radarSolidScan();
  }

  radarSolidScan() {
    // 先建立椭球体
    this._viewer.entities.add({
      position: new Cesium.Cartesian3.fromDegrees(this._cenLon, this._cenLat, this._height),
      name: '立体雷达扫描',
      ellipsoid: {
        radii: new Cesium.Cartesian3(this._radius, this._radius, this._radius),
        material: this._color,
        outline: true,
        outlineColor: new Cesium.Color(1.0, 1.0, 0.0, 0.3),
        outlineWidth: 1,
        // 保证是半个球体
        maximumCone: Cesium.Math.PI / 2,
      },
    });
    // 创建1/4圆形立体墙
    this._viewer.entities.add({
      wall: {
        positions: new Cesium.CallbackProperty(() => {
          return Cesium.Cartesian3.fromDegreesArrayHeights(this.positionArr);
        }, false),
        material: this._colorWall,
      },
    });

    this.addPostRender();
  }
  addPostRender() {
    this._viewer.clock.onTick.addEventListener(() => {
      this.heading += this._speed; //可调节转动速度
      this.positionArr = this.calculatePane(this._cenLon, this._cenLat, this._radius, this.heading, this._height);
    });
  }
  // 计算平面扫描范围
  calculatePane(x1, y1, radius, heading, height) {
    var m = Cesium.Transforms.eastNorthUpToFixedFrame(Cesium.Cartesian3.fromDegrees(x1, y1));
    var rx = radius * Math.cos((heading * Math.PI) / 180.0);
    var ry = radius * Math.sin((heading * Math.PI) / 180.0);
    var translation = Cesium.Cartesian3.fromElements(rx, ry, 0);
    var d = Cesium.Matrix4.multiplyByPoint(m, translation, new Cesium.Cartesian3());
    var c = Cesium.Cartographic.fromCartesian(d);
    var x2 = Cesium.Math.toDegrees(c.longitude);
    var y2 = Cesium.Math.toDegrees(c.latitude);
    return this.calculateSector(x1, y1, x2, y2, height);
  }

  // 计算竖直扇形
  calculateSector(x1, y1, x2, y2, height) {
    let positionArr = [];
    positionArr.push(x1);
    positionArr.push(y1);
    positionArr.push(0);
    var radius = Cesium.Cartesian3.distance(Cesium.Cartesian3.fromDegrees(x1, y1), Cesium.Cartesian3.fromDegrees(x2, y2));
    // 扇形是1/4圆，因此角度设置为0-90
    for (let i = 0; i <= 90; i++) {
      let h = radius * Math.sin((i * Math.PI) / 180.0) + height;
      let r = Math.cos((i * Math.PI) / 180.0);
      let x = (x2 - x1) * r + x1;
      let y = (y2 - y1) * r + y1;
      positionArr.push(x);
      positionArr.push(y);
      positionArr.push(h);
    }
    return positionArr;
  }
}

export default TrackMatte;
