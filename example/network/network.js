import weCropper from '../../src/weCropper.core.js'

const __network_image__ = 'http://image.smartisanos.cn/resource/a9ea11be5ffa8225110782fe3ac46a74.png'

Page({
  data: {
		id: 'cropper',
		width: 750,
		height: 750,
		minScale: 1,
		maxScale: 2.5
	},
  touchStart (e) {
    this.wecropper.touchStart(e)
  },
  touchMove (e) {
    this.wecropper.touchMove(e)
  },
  touchEnd (e) {
    this.wecropper.touchEnd(e)
  },
  getCropperImage () {
    this.wecropper.getCropperImage((src) => {
      if (src) {
        wx.previewImage({
          current: '', // 当前显示图片的http链接
          urls: [src] // 需要预览的图片http链接列表
        })
      } else {
        console.log('获取图片地址失败，请稍后重试')
      }
    })
  },
	uploadTap () {
  	this.wecropper.pushOrign(__network_image__)
	},
  onLoad (option) {
		const { data } = this

		new weCropper(data)
			.on('ready', (ctx) => {
				console.log(`wecropper is ready for work!`)
			})
			.on('beforeImageLoad', (ctx) => {
				console.log(`weCropper is ready`)
				console.log(`current canvas context:`, ctx)
				wx.showToast({
					title: '上传中',
					icon: 'loading',
					duration: 20000
				})
			})
			.on('imageLoad', (ctx) => {
				console.log(`picture loaded`)
				console.log(`current canvas context:`, ctx)
				wx.hideToast()
			})
  }
})
