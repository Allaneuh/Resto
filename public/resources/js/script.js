

function geoplugin_request() { return '195.101.79.41';} 
function geoplugin_status() { return '200';} 
function geoplugin_credit() { return 'Some of the returned data includes GeoLite data created by MaxMind, available from <a href=\'http://www.maxmind.com\'>http://www.maxmind.com</a>.';} 
function geoplugin_delay() { return '1ms';} 
function geoplugin_city() { return 'Florange';} 
function geoplugin_region() { return 'Grand Est';} 
function geoplugin_regionCode() { return '57';} 
function geoplugin_regionName() { return 'Moselle';} 
function geoplugin_areaCode() { return '';} 
function geoplugin_dmaCode() { return '';} 
function geoplugin_countryCode() { return 'FR';} 
function geoplugin_countryName() { return 'France';} 
function geoplugin_inEU() { return 1;} 
function geoplugin_euVATrate() { return 20;} 
function geoplugin_continentCode() { return 'EU';} 
function geoplugin_latitude() { return '49.3237';} 
function geoplugin_longitude() { return '6.1212';} 
function geoplugin_locationAccuracyRadius() { return '200';} 
function geoplugin_timezone() { return 'Europe/Paris';} 
function geoplugin_currencyCode() { return 'EUR';} 
function geoplugin_currencySymbol() { return '&#8364;';} 
function geoplugin_currencySymbol_UTF8() { return '€';} 
function geoplugin_currencyConverter(amt, symbol) { 
	if (!amt) { return false; } 
	var converted = amt * 0.8475; 
	if (converted <0) { return false; } 
	if (symbol === false) { return Math.round(converted * 100)/100; } 
	else { return '&#8364;'+(Math.round(converted * 100)/100);} 
	return false; 
} 