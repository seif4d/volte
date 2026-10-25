(function(root){
  'use strict';
  const plans = Object.freeze({Express:{minutes:30,price:900},Premium:{minutes:60,price:1200},'Elite VIP':{minutes:90,price:1600}});
  function localDate(date=new Date()){
    return [date.getFullYear(),String(date.getMonth()+1).padStart(2,'0'),String(date.getDate()).padStart(2,'0')].join('-');
  }
  function requestUrl(data){
    const plan=plans[data.plan];
    if(!plan)throw new Error('Unknown package');
    if(!data.area.trim())throw new Error('Area is required');
    const rows=['مرحباً كابتن محمود، أريد الاستفسار عن توافر جلسة VOLT Recovery.',`الباقة: ${data.plan}`,`المدة: ${plan.minutes} دقيقة`,`السعر: ${plan.price} جنيه`,`هدف الجلسة: ${data.goal}`,`المنطقة: ${data.area}`,`اليوم المفضل: ${data.date||'نتفق عليه'}`,`الوقت المفضل: ${data.time||'نتفق عليه'}`];
    if(data.notes.trim()) rows.push(`ملاحظات: ${data.notes.trim()}`);
    rows.push('في انتظار تأكيد توافر الموعد.');
    return 'https://wa.me/201070954997?text='+encodeURIComponent(rows.join('\n'));
  }
  const api={plans,localDate,requestUrl};
  if(typeof module!=='undefined'&&module.exports)module.exports=api;
  else root.VoltBooking=api;
})(globalThis);