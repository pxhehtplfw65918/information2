var G = {};

var data = {
	lang:'zh-CN',
	currency_id:'86',
	symbol:'￥',
	symbol_right:'CNY',
	label:'中文',
	standard:true,
	img:'https://static.shopsuite.cn/shopsuite/flags/square/5322affbc4d56.png',
	items:[
		{
			lang:'zh-CN',
			currency_id:'86',
			symbol:'￥',
			symbol_right:'CNY',
			label:'中文',
			standard:true,
			img:'https://static.shopsuite.cn/shopsuite/flags/square/5322affbc4d56.png'
		},
		{
			lang:'zh-HK',
			currency_id:'852',
			symbol:'￥',
			symbol_right:'CNY',
			label:'中国香港',
			standard:true,
			img:'https://static.shopsuite.cn/shopsuite/flags/square/5322affbc4d56.png'
		},
		{
			lang:'zh-TW',
			currency_id:'886',
			symbol:'NT$',
			symbol_right:'TWD',
			label:'中国台湾',
			standard:true,
			img:'https://static.shopsuite.cn/shopsuite/flags/square/5322affbc4d56.png'
		},
		{
			lang:'en-US',
			currency_id:'1',
			symbol:'$',
			symbol_right:'USD',
			label:'English',
			standard:false,
			img:'https://static.shopsuite.cn/shopsuite/flags/square/5322affbd2fde.png'
		},
		{
			lang:'ja-JP',
			currency_id:'81',
			label:'日本語',
			standard:false,
			symbol:'J.￥',
			symbol_right:'JPY',
			img:'https://static.shopsuite.cn/shopsuite/flags/square/5322affba1acd.png'
		},
		{
			lang:'th-TH',
			currency_id:'66',
			symbol:'฿',
			symbol_right:'THB',
			label:'ภาษาไทย',
			standard:false,
			img:'https://static.shopsuite.cn/shopsuite/flags/square/5322affba41e4.png'
		},
		{
			lang:'es-MX',
			currency_id:'52',
			symbol:'Mex.$',
			symbol_right:'MXP',
			label:'México',
			standard:false,
			img:'https://static.shopsuite.cn/shopsuite/flags/square/5322affb9d481.png'
		},
		{
			lang:'ar-SA',
			currency_id:'966',
			symbol:'S.R.',
			symbol_right:'SAR',
			standard:true,
			label:'عربي ،',
			img:'https://static.shopsuite.cn/shopsuite/flags/square/5322affbcc280.png',
		},
		{
			lang:'vi-VN',
			currency_id:'84',
			symbol:'Tc.',
			symbol_right:'THB',
			label:'ViệtName',
			standard:false,
			img:'https://static.shopsuite.cn/shopsuite/flags/square/5322affbaedc0.png'
		},
		{
			lang:'tr-TR',
			currency_id:'52',
			symbol:'TL.',
			symbol_right:'TRL',
			label:'Türkçe',
			standard:false,
			img:'https://static.shopsuite.cn/shopsuite/flags/square/5322affbba93b.png'
		},
		{
			lang:'id-ID',
			currency_id:'62',
			symbol:'Rps.',
			symbol_right:'IDR',
			label:'IndonesiaName',
			standard:false,
			img:'https://static.shopsuite.cn/shopsuite/flags/square/5322affbefcd4.png'
		},
		{
			lang:'en-GB',
			currency_id:'44',
			symbol:'€',
			symbol_right:'EUR',
			label:'Britain',
			standard:false,
			img:'https://static.shopsuite.cn/shopsuite/flags/square/5322affbc9b6c.png'
		},
		{
			lang:'es-ES',
			currency_id:'34',
			symbol:'€',
			symbol_right:'EUR',
			label:'España',
			standard:false,
			img:'https://static.shopsuite.cn/shopsuite/flags/square/5322affb9d481.png'
		},
		{
			lang:'de-DE',
			currency_id:'49',
			symbol:'€',
			symbol_right:'EUR',
			label:'Deutsch',
			standard:false,
			img:'https://static.shopsuite.cn/shopsuite/flags/square/5322affbc0ecf.png'
		},
		{
			lang:'fr-FR',
			currency_id:'33',
			symbol:'€',
			symbol_right:'EUR',
			label:'Français',
			standard:false,
			img:'https://static.shopsuite.cn/shopsuite/flags/square/5322affb9fb8a.png'
		},
		{
			lang:'pt-PT',
			currency_id:'351',
			symbol:'€',
			symbol_right:'EUR',
			label:'Português',
			standard:false,
			img:'https://static.shopsuite.cn/shopsuite/flags/square/5322affbf0c70.png'
		},
		{
			lang:'it-IT',
			currency_id:'39',
			symbol:'€',
			symbol_right:'EUR',
			label:'Italiano',
			standard:false,
			img:'https://static.shopsuite.cn/shopsuite/flags/square/5322affbba16a.png'
		},
		{
			lang:'ru-RU',
			currency_id:'7',
			symbol:'Rbl.',
			symbol_right:'RUB',
			label:'Русский язык',
			standard:false,
			img:'https://static.shopsuite.cn/shopsuite/flags/square/5322affba229e.png'
		},
		{
			lang:'ro-RO',
			currency_id:'40',
			symbol:'L.',
			symbol_right:'RON',
			label:'România',
			standard:false,
			img:'https://static.shopsuite.cn/shopsuite/flags/square/5322affb9ccab.png'
		},
		{
			lang:'az-AZ',
			currency_id:'994',
			symbol:'AZN',
			symbol_right:'AZN',
			label:'AzerbayjanlıName',
			standard:false,
			img:'https://static.shopsuite.cn/shopsuite/flags/square/5322affbd2044.png'
		},
		{
			lang:'el-GR',
			currency_id:'30',
			symbol:'€',
			symbol_right:'EUR',
			label:'Ελληνικά',
			standard:false,
			img:'https://static.shopsuite.cn/shopsuite/flags/square/5322affbec621.png'
		},
		{
			lang:'fi-FI',
			currency_id:'358',
			symbol:'€',
			symbol_right:'EUR',
			label:'Suomi',
			standard:false,
			img:'https://static.shopsuite.cn/shopsuite/flags/square/5322affbdd3f1.png'
		},
		{
			lang:'lv-LV',
			currency_id:'371',
			symbol:'€',
			symbol_right:'EUR',
			label:'Latvijas',
			standard:false,
			img:'https://static.shopsuite.cn/shopsuite/flags/square/5322affbe29e1.png'
		},
		{
			lang:'nl-NL',
			currency_id:'31',
			symbol:'€',
			symbol_right:'EUR',
			label:'Nederlands',
			standard:false,
			img:'https://static.shopsuite.cn/shopsuite/flags/square/5322affbd7633.png'
		},
		{
			lang:'da-DK',
			currency_id:'35',
			symbol:'€',
			symbol_right:'EUR',
			label:'Denmark',
			standard:false,
			img:'https://static.shopsuite.cn/shopsuite/flags/square/5322affbe9741.png'
		},
		{
			lang:'sr-RS',
			currency_id:'381',
			symbol:'€',
			symbol_right:'EUR',
			label:'Република Србија',
			standard:false,
			img:'https://static.shopsuite.cn/shopsuite/flags/square/5322affb99601.png'
		},
		{
			lang:'pl-PL',
			currency_id:'48',
			symbol:'€',
			symbol_right:'EUR',
			label:'Polski',
			standard:false,
			img:'https://static.shopsuite.cn/shopsuite/flags/square/5322affbb5356.png'
		},
		{
			lang:'uk-UA',
			currency_id:'380',
			symbol:'€',
			symbol_right:'EUR',
			label:'УкраїнськаName',
			standard:false,
			img:'https://static.shopsuite.cn/shopsuite/flags/square/5322affbd5ec1.png'
		},
		{
			lang:'kk-KZ',
			currency_id:'327',
			symbol:'〒',
			symbol_right:'KZT',
			label:'ҚазақстанName',
			standard:false,
			img:'https://static.shopsuite.cn/shopsuite/flags/square/5322affbc2e0f.png'
		},
		{
			lang:'my-MM',
			currency_id:'95',
			symbol:'K.',
			symbol_right:'BUK',
			label:'မြန်မာ',
			standard:false,
			img:'https://static.shopsuite.cn/shopsuite/flags/square/5322affba323e.png'
		},
		{
			lang:'ko-KR',
			currency_id:'82',
			symbol:'W',
			symbol_right:'KRW',
			label:'한국.',
			standard:false,
			img:'https://static.shopsuite.cn/shopsuite/flags/square/ko_KR.png'
		}
	]
}
/*

import ar_SA from "@/config/locales/ar_SA";
import en_GB from "@/config/locales/en_GB";
import es_MX from "@/config/locales/es_MX";
import th_TH from "@/config/locales/th_TH";
import vi_VN from "@/config/locales/vi_VN";
import tr_TR from "@/config/locales/tr_TR";
import ja_JP from "@/config/locales/ja_JP";
import id_ID from "@/config/locales/id_ID";

import de_DE from "@/config/locales/de_DE";
import fr_FR from "@/config/locales/fr_FR";
import pt_PT from "@/config/locales/pt_PT";
import it_IT from "@/config/locales/it_IT";

import ro_RO from "@/config/locales/ro_RO";
import ru_RU from "@/config/locales/ru_RU";


import az_AZ from "@/config/locales/az_AZ";
import el_GR from "@/config/locales/el_GR";
import fi_FI from "@/config/locales/fi_FI";
import lv_LV from "@/config/locales/lv_LV";
import nl_NL from "@/config/locales/nl_NL";
import da_DK from "@/config/locales/da_DK";
import sr_RS from "@/config/locales/sr_RS";
import pl_PL from "@/config/locales/pl_PL";
import uk_UA from "@/config/locales/uk_UA";
import kk_KZ from "@/config/locales/kk_KZ";

import my_MM from "@/config/locales/my_MM";
import ko_KR from "@/config/locales/ko_KR";

import zh_TW from "@/config/locales/zh_TW";


//可以配置国家及语言， 例如两个国家，默认只想同一个翻译语言
G['ar-SA'] = ar_SA;
G['ar-BD'] = ar_SA;

G['en-US'] = en_GB;
G['en-GB'] = en_GB;

G['es-MX'] = es_MX;
G['es-ES'] = es_MX;

G['th-TH'] = th_TH;
G['vi-VN'] = vi_VN;
G['tr-TR'] = tr_TR;
G['ja-JP'] = ja_JP;

G['id-ID'] = id_ID;

G['de-DE'] = de_DE;
G['fr-FR'] = fr_FR;
G['pt-PT'] = pt_PT;
G['it-IT'] = it_IT;

G['ro-RO'] = ro_RO;
G['ru-RU'] = ru_RU;


G['az-AZ'] = az_AZ;
G['el-GR'] = el_GR;
G['fi-FI'] = fi_FI;
G['lv-LV'] = lv_LV;
G['nl-NL'] = nl_NL;
G['da-DK'] = da_DK;
G['sr-RS'] = sr_RS;
G['pl-PL'] = pl_PL;
G['uk-UA'] = uk_UA;
G['kk-KZ'] = kk_KZ;

G['my-MM'] = my_MM;
G['ko-KR'] = ko_KR;

G['zh-HK'] = zh_TW;
G['zh-TW'] = zh_TW;
*/


try {
	if  (uni.getStorageSync('language'))
	{

	}
	else
	{
		const res = uni.getSystemInfoSync();
		//如果不在允许的语言内，可重置
		uni.setStorageSync('language', data.lang);
		uni.setStorageSync('standard', data.standard);
	}

	//默认显示方式
	uni.setStorageSync('standard', true);
		
	data.lang = uni.getStorageSync('language')
	data.standard = uni.getStorageSync('standard')
} catch (e) {
	// error
}

try {
    if  (uni.getStorageSync('currency_id'))
    {
        data.currency_id = uni.getStorageSync('currency_id')
    }
    else
    {
        uni.setStorageSync('currency_id', data.currency_id);
    }
} catch (e) {
    // error
}


for(let idx in data.items)
{
	if(data.items[idx].lang == data.lang){
		data.label = data.items[idx].label
		data.img = data.items[idx].img


		data.currency_id = data.items[idx].currency_id
		data.symbol = data.items[idx].symbol
		data.symbol_right = data.items[idx].symbol_right
		data.standard = data.items[idx].standard

		break;
	}
}


function __(str)
{
	return str;

	//let lang = uni.getStorageSync('language');
	//lang = 'en-US';
	if (typeof G[data.lang] == 'undefined' || typeof G[data.lang][str] == 'undefined')
	{
		return str
	}
	else
	{
		if(data.currency_id == '86')
		{
			return str;
		}
		else
		{
			return G[data.lang][str].replace(/￥/g, data.symbol).replace(/RMB|元/g, data.symbol_right);
		}
	}
}

export default {
	__:__,
	lang:data.lang,
	standard:data.standard,
	currency_id:data.currency_id,
	symbol:data.symbol,
	label:data.label,
	img:data.img,
	data:data,
	G:G
}
