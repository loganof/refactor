function playFor(aPerformance) {
  return plays[aPerformance];
}

function statement(invoice, plays) {
  let totalAmount = 0;
  let volumeCredits = 0;
  let result = `Statement for ${invoice.customer}\n`;
  const format = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format;
  for (let perf of invoice.performances) {
    const play = playFor(perf);
    let thisAmount = amountFor(perf, play);
    //  add volume credits
    volumeCredits += Math.max(perf.audience - 30, 0);
    //   add extra credict for every ten comedy attendees
    if ("comedy" == play.type) volumeCredits += Math.floor(perf.audience / 5);

    //   print line  for this order
    result += `${play.name}: ${format(thisAmount / 100)} (${
      perf.audience
    } seats)\n`;
    totalAmount += thisAmount;
  }
  result += `Amount owed is ${format(totalAmount / 100)}\n`;
  result += `You earned ${volumeCredits} credits\n`;
  return result;
}
