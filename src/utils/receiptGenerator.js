import { formatDateTime, formatXLM } from './formatters';

export const generateReceipt = ({
  txHash,
  vendorAddress,
  customerAddress,
  amount,
  productName,
  memo,
  timestamp,
  explorerUrl
}) => {
  return {
    receiptId: `RCP-${txHash.slice(0, 8).toUpperCase()}`,
    txHash,
    vendorAddress,
    customerAddress,
    amount: parseFloat(amount),
    productName,
    memo,
    timestamp: timestamp || new Date().toISOString(),
    formattedDate: formatDateTime(timestamp || new Date().toISOString()),
    formattedAmount: formatXLM(amount),
    explorerUrl: explorerUrl || `https://stellar.expert/explorer/testnet/tx/${txHash}`,
    network: 'Stellar Testnet',
  };
};

export const printReceipt = (receipt) => {
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>VendorPay Receipt - ${receipt.receiptId}</title>
      <style>
        body { font-family: 'Courier New', monospace; max-width: 400px; margin: 40px auto; padding: 20px; }
        .header { text-align: center; border-bottom: 2px dashed #333; padding-bottom: 16px; margin-bottom: 16px; }
        .logo { font-size: 24px; font-weight: bold; }
        .row { display: flex; justify-content: space-between; margin: 8px 0; font-size: 13px; }
        .label { color: #666; }
        .value { font-weight: bold; }
        .amount { font-size: 28px; text-align: center; margin: 20px 0; font-weight: bold; }
        .footer { text-align: center; border-top: 2px dashed #333; padding-top: 16px; margin-top: 16px; font-size: 11px; color: #999; }
        .hash { font-size: 10px; word-break: break-all; }
      </style>
    </head>
    <body>
      <div class="header">
        <div class="logo">VendorPay</div>
        <div>Payment Receipt</div>
        <div style="font-size:12px;color:#666;">${receipt.receiptId}</div>
      </div>
      <div class="amount">${receipt.formattedAmount}</div>
      <div class="row"><span class="label">Product</span><span class="value">${receipt.productName}</span></div>
      <div class="row"><span class="label">Date</span><span class="value">${receipt.formattedDate}</span></div>
      <div class="row"><span class="label">Network</span><span class="value">${receipt.network}</span></div>
      <div class="row"><span class="label">Memo</span><span class="value">${receipt.memo}</span></div>
      <div style="margin-top:16px;">
        <div class="label" style="font-size:11px;">Transaction Hash</div>
        <div class="hash value">${receipt.txHash}</div>
      </div>
      <div class="footer">
        <div>Powered by Stellar Blockchain</div>
        <div>No bank required</div>
      </div>
    </body>
    </html>
  `;
  const win = window.open('', '_blank');
  win.document.write(html);
  win.document.close();
  win.print();
};
