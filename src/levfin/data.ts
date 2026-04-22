// ── Color tokens (matches design standards) ────────────────────────────────
export const C = {
  bg: '#eff0ff', card: '#fff', cardBorder: '#d1d3d4',
  topNav: '#1a0050', accent: '#4b2ff6', accentMid: '#4b3ccd',
  accentLight: '#c4c2ff', accentPale: '#eff0ff',
  text: '#212223', textBlue: '#4b3ccd', textGrey: '#515355', textMuted: '#808488',
  green: '#00a757', greenText: '#00673c', greenBg: '#e5fbec', greenStroke: '#a5e5ba',
  red: '#dc0000', redBg: '#fff5f5', redStroke: '#ff9191',
  yellow: '#bb8700', yellowText: '#4e3d00', yellowBg: '#fffae0', yellowStroke: '#ffdc61',
  aquaText: '#1d6e88', aquaBg: '#e4f6fc', aquaStroke: '#9ee0f5',
  purpleBg: '#eff0ff', purpleStroke: '#c4c2ff',
  div: '#d1d3d4', rowBorder: '#d1d3d4',
  gBlue: '#4b2ff6', gGreen: '#00a757', gYellow: '#bb8700', gAqua: '#2c9abd',
  nowRed: '#dc0000',
}

export interface StatusTag {
  label: string
  color: string
  bg: string
  stroke: string
}

export interface Deal {
  id: number
  issuer: string
  sector: string
  flex: string | null
  type: string
  size: string
  spread: string
  oid: string
  rv: StatusTag
  status: StatusTag
}

export const DEALS: Deal[] = [
  { id: 1, issuer: 'Apex Group', sector: 'Healthcare', flex: 'Rev Flex', type: 'TLB', size: '$1,750M', spread: 'S+425', oid: '99.5', rv: { label: '-12bps Rich', color: C.red, bg: C.redBg, stroke: C.redStroke }, status: { label: 'Pricing Today', color: C.textBlue, bg: C.purpleBg, stroke: C.purpleStroke } },
  { id: 2, issuer: 'Meridian Tech Solutions', sector: 'Technology', flex: null, type: 'TLB', size: '$1,200M', spread: 'S+420', oid: '99.5', rv: { label: '+8bps Cheap', color: C.greenText, bg: C.greenBg, stroke: C.greenStroke }, status: { label: 'Pricing Today', color: C.textBlue, bg: C.purpleBg, stroke: C.purpleStroke } },
  { id: 3, issuer: 'ClearPath Logistics', sector: 'Industrials', flex: 'Flex Out', type: 'TLB', size: '$1,320M', spread: 'S+425', oid: '99.5', rv: { label: '+35bps Cheap', color: C.greenText, bg: C.greenBg, stroke: C.greenStroke }, status: { label: 'Books Open', color: C.yellowText, bg: C.yellowBg, stroke: C.yellowStroke } },
  { id: 4, issuer: 'Vantage Consumer Brands', sector: 'Consumer', flex: null, type: 'TL', size: '$1,770M', spread: 'S+425', oid: '99.5', rv: { label: 'At Market', color: C.aquaText, bg: C.aquaBg, stroke: C.aquaStroke }, status: { label: 'Priced', color: C.greenText, bg: C.greenBg, stroke: C.greenStroke } },
  { id: 5, issuer: 'Stratos Energy Partners', sector: 'Energy', flex: null, type: 'TL', size: '$1,750M', spread: 'S+425', oid: '99.5', rv: { label: 'TBD at Pricing', color: C.text, bg: '#f0f0f0', stroke: C.div }, status: { label: 'Roadshow', color: C.text, bg: '#f0f0f0', stroke: C.div } },
  { id: 6, issuer: 'Beta Innovations Ltd.', sector: 'Software', flex: 'Rev Flex', type: 'TL', size: '$1,330M', spread: 'S+425', oid: '99.5', rv: { label: 'TBD at Pricing', color: C.text, bg: '#f0f0f0', stroke: C.div }, status: { label: 'Announced', color: C.text, bg: '#f0f0f0', stroke: C.div } },
  { id: 7, issuer: 'Helix Pharma Group', sector: 'Healthcare', flex: null, type: 'TLB', size: '$2,100M', spread: 'S+400', oid: '99.0', rv: { label: '-5bps Rich', color: C.red, bg: C.redBg, stroke: C.redStroke }, status: { label: 'Pricing Today', color: C.textBlue, bg: C.purpleBg, stroke: C.purpleStroke } },
  { id: 8, issuer: 'Nexus Software Inc.', sector: 'Software', flex: 'Rev Flex', type: 'TLB', size: '$980M', spread: 'S+450', oid: '99.0', rv: { label: '+20bps Cheap', color: C.greenText, bg: C.greenBg, stroke: C.greenStroke }, status: { label: 'Books Open', color: C.yellowText, bg: C.yellowBg, stroke: C.yellowStroke } },
  { id: 9, issuer: 'Cascade Health Systems', sector: 'Healthcare', flex: null, type: 'TL', size: '$2,300M', spread: 'S+390', oid: '99.0', rv: { label: '-18bps Rich', color: C.red, bg: C.redBg, stroke: C.redStroke }, status: { label: 'Pricing Today', color: C.textBlue, bg: C.purpleBg, stroke: C.purpleStroke } },
  { id: 10, issuer: 'Titan Energy Holdings', sector: 'Energy', flex: null, type: 'TL', size: '$1,900M', spread: 'S+480', oid: '98.0', rv: { label: '+50bps Cheap', color: C.greenText, bg: C.greenBg, stroke: C.greenStroke }, status: { label: 'Books Open', color: C.yellowText, bg: C.yellowBg, stroke: C.yellowStroke } },
]

export const METRICS = [
  { label: 'HY Spread', value: '6.75%', delta: '-2bps WoW', up: false },
  { label: 'IG Spread', value: '315bps', delta: '-8bps WoW', up: false },
  { label: 'HY Index', value: '$99.57', delta: '-1.11 vs. 1mo', up: false },
  { label: 'Loan Index', value: '$90.0', delta: '-556bps vs broad', up: false },
  { label: '10Y UST', value: '3.66%', delta: 'Fed on hold', up: null },
  { label: 'S\u0026P 500', value: '6,910', delta: '+1.1% WoW', up: true },
]

export const ALERTS = [
  { time: '09:14', type: 'PRICING', sc: '#4e3d00', sb: '#fffae0', text: 'Apex Instruments $1.2B TLB priced at S+412 (tighter than S+425 talk)' },
  { time: '08:52', type: 'LAUNCH', sc: '#00673c', sb: '#e5fbec', text: 'Blackstone RE $2.1B Senior Notes launched at 98.5 OID' },
  { time: '08:31', type: 'UPDATE', sc: '#4b3ccd', sb: '#eff0ff', text: 'KKR Portfolio Co. roadshow oversubscribed 3.2x — books close noon' },
  { time: '07:55', type: 'DELAY', sc: '#dc0000', sb: '#fff5f5', text: 'Apollo PIK deal delayed — credit committee revision pending' },
  { time: '07:22', type: 'RATING', sc: '#515355', sb: '#f0f0f0', text: "Moody's affirms Carlyle portfolio co. at B1, stable outlook" },
]
