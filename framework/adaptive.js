//自适应屏幕 + 高清方案
import { pageConfig } from './config'

const doc   = window.document;
const nav   = window.navigator;
const docEl = doc.documentElement;

const adaptive = (baseFontSize = 100,
                  isScale      = true,
                  viewportFit  = 'cover') => {
	let ua        = nav.userAgent,
	    matches   = ua.match(/Android[\S\s]+AppleWebkit\/(\d{3})/i),
	    UcVersion = ua.match(/U3\/((\d+|\.){5,})/i),
	    isUCHd    = UcVersion && parseInt(UcVersion[1].split('.').join(''), 10) >= 80,
	    isIOS     = nav.appVersion.match(/(iphone|ipad|ipod)/gi),
	    scale     = 1;
	if (isScale) {
		let dpr = window.devicePixelRatio || 1;
		// 如果非iOS, 非Android4.3以上, 非UC内核, 就不执行高清, dpr设为1;
		if (!isIOS && !(matches && matches[1] > 534) && !isUCHd) dpr = 1;
		scale = 1 / dpr;
		if (scale < 1) docEl.setAttribute('data-scale', scale);
	}
	// set meta
	let metaEl = doc.querySelector('meta[name="viewport"]');
	if (!metaEl) {
		metaEl = doc.createElement('meta');
		metaEl.setAttribute('name', 'viewport');
		doc.head.appendChild(metaEl);
	}
	metaEl.setAttribute('content', 'width=device-width,user-scalable=no,initial-scale=' + scale + ',maximum-scale=' + scale + ',minimum-scale=' + scale + ',viewport-fit=' + viewportFit);
	const refreshRem = () => {
		let width   = docEl.getBoundingClientRect().width,
		    rootRem = width / 750 * baseFontSize;
		// 未缩放时布局适口宽大于 525，按照 525 宽度适配
		if (width * scale > 525) rootRem = 525 / scale / 750 * baseFontSize;
		docEl.style.fontSize = rootRem + 'px';
		doc.body.style.fontSize = `${12/scale}px`;
	}
	window.addEventListener('orientationchange', () => setTimeout(refreshRem, 100));
	refreshRem();
}

const { scale, viewportFit } = pageConfig;
//高清设配
adaptive(scale, viewportFit);
