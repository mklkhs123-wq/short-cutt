// Smart Finance App JS - DOM-ready + reliable selectors + error handling

document.addEventListener('DOMContentLoaded', () => {
  // --- UI: section switching
  const buttons = document.querySelectorAll('.sidebar button');
  const panels = document.querySelectorAll('.panel');
  buttons.forEach(b => b.addEventListener('click', ()=>{
    buttons.forEach(x=>x.classList.remove('active'));
    b.classList.add('active');
    const id = b.dataset.section;
    panels.forEach(p=> p.id===id ? p.classList.remove('hidden') : p.classList.add('hidden'));
  }));

  // helper: safe get
  const $ = id => document.getElementById(id);

  // --- EMI
  function calcEMI(P, rAnnual, years){
    const r = rAnnual/12/100;
    const n = years*12;
    if(r===0) return P/n;
    const emi = (P*r*Math.pow(1+r,n))/(Math.pow(1+r,n)-1);
    return emi;
  }
  $('emi-calc').addEventListener('click', ()=>{
    const P=+$('emi-principal').value;
    const r=+$('emi-rate').value;
    const y=+$('emi-years').value;
    if(!(P>0) || !(y>0)) return alert('Enter valid values');
    const emi = calcEMI(P,r,y);
    const total = emi * y * 12;
    const interest = total - P;
    $('emi-result').innerHTML = `Monthly EMI: ₹${emi.toFixed(2)}<br>Total Payment: ₹${total.toFixed(2)}<br>Total Interest: ₹${interest.toFixed(2)}`;
  });

  // --- FD
  function calcFD(P, rAnnual, years, comp){
    const n = comp*years;
    const rate = rAnnual/100/comp;
    const A = P*Math.pow(1+rate, n);
    return A;
  }
  $('fd-calc').addEventListener('click', ()=>{
    const P=+$('fd-principal').value;
    const r=+$('fd-rate').value;
    const y=+$('fd-years').value;
    const comp=+$('fd-comp').value;
    if(!(P>0) || !(y>0)) return alert('Enter valid values');
    const A = calcFD(P,r,y,comp);
    $('fd-result').innerHTML = `Maturity Amount: ₹${A.toFixed(2)}<br>Interest Earned: ₹${(A-P).toFixed(2)}`;
  });

  // --- SIP (future value of series)
  function calcSIP(monthly, annualRate, years){
    const r = annualRate/12/100;
    const n = years*12;
    if(r===0) return monthly*n;
    const fv = monthly * ( (Math.pow(1+r,n)-1)/r ) * (1+r);
    return fv;
  }
  $('sip-calc').addEventListener('click', ()=>{
    const m=+$('sip-monthly').value;
    const r=+$('sip-rate').value;
    const y=+$('sip-years').value;
    if(!(m>0) || !(y>0)) return alert('Enter valid values');
    const fv = calcSIP(m,r,y);
    const invested = m*y*12;
    $('sip-result').innerHTML = `Maturity Value: ₹${fv.toFixed(2)}<br>Invested Amount: ₹${invested.toFixed(2)}<br>Estimated Gain: ₹${(fv-invested).toFixed(2)}`;
  });

  // --- RD (approx formula)
  function calcRD(monthly, annualRate, years){
    const r = annualRate/12/100;
    const n = years*12;
    if(r===0) return monthly * n;
    const fv = monthly * ( (Math.pow(1+r,n)-1)/r );
    return fv;
  }
  $('rd-calc').