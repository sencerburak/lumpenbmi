// Basit VKI hesaplayıcı — Türkçe ve biraz küfürbaz yorumlar
document.addEventListener('DOMContentLoaded', ()=>{
  const weightEl = document.getElementById('weight');
  const heightEl = document.getElementById('height');
  const calcBtn = document.getElementById('calc-btn');
  const resetBtn = document.getElementById('reset-btn');
  const resultEl = document.getElementById('result');

  const comments = {
    underweight: [
      'Ölecen amına koyduğumun açlıktan, biraz yemek ye lan!',
      'Kemik üstü deri kalmışsın, iki tost ısmarla kendine yoksa ölecen.'
    ],
    normal: [
      'Kötü değilsin ama şımarma lan, formunu koru yoksa şişersin.',
      'Normal aralıkta. Fena değil, hadi daha iyi olma çabası göster yoksa şişmanlanırsın.'
    ],
    overweight: [
      'Şişmanlanıyorsun amına koyduğumun, az ye biraz yoksa ölecen!',
      'Kilolu gözüküyorsun, mideni seveceksen az ye de sev yoksa şişersin.'
    ],
    obese: [
      'Obeziteye girdin lan, ölecen az ye yoksa amına koyduğumun!',
      'Ciddi kilo var—şaka yapmıyorum, doktora danış veya az ye yoksa şişersin.'
    ]
  };

  function pick(arr){ return arr[Math.floor(Math.random()*arr.length)]; }

  function showMessage(html){ resultEl.innerHTML = html }

  function calculate(){
    const w = parseFloat(weightEl.value);
    const hcm = parseFloat(heightEl.value);
    if(!w || !hcm || w <= 0 || hcm <= 0){
      showMessage('<span style="color:var(--danger)">Geçersiz değer — kilo ve boy gir.</span>');
      return;
    }
    const h = hcm/100;
    const bmi = +(w/(h*h)).toFixed(1);

    let category = '';
    if(bmi < 18.5) category = 'Zayıf';
    else if(bmi < 25) category = 'Normal';
    else if(bmi < 30) category = 'Fazla kilolu';
    else category = 'Obez';

    let commentKey = 'normal';
    if(bmi < 18.5) commentKey = 'underweight';
    else if(bmi < 25) commentKey = 'normal';
    else if(bmi < 30) commentKey = 'overweight';
    else commentKey = 'obese';

    const comment = pick(comments[commentKey]);

    const html = `
      <div class="bmi">VKI: ${bmi} — <strong>${category}</strong></div>
      <div style="margin-top:8px;color:var(--muted)">Kilo: ${w} kg • Boy: ${hcm} cm</div>
      <div style="margin-top:10px;font-weight:600">Yorum: ${comment}</div>
    `;

    showMessage(html);
  }

  calcBtn.addEventListener('click', calculate);
  resetBtn.addEventListener('click', ()=>{
    weightEl.value = '';
    heightEl.value = '';
    showMessage('');
  });
});
