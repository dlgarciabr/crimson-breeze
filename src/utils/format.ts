export const formatValue = (value: number, showCurrency: boolean) => {
  return new Intl.NumberFormat('pt-PT', showCurrency ? { style: 'currency', currency: 'EUR' }: {minimumFractionDigits: 2}).format(
    value,
  );
}