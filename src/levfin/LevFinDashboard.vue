<template>
  <!-- ═══════════════════════════════════════════════════════════════
    LevFin Dashboard — Vue
    All layout/UI components imported from @reorg-research/frontend-global-components
    Pipeline Gantt chart is custom (no GC equivalent exists)
  ═══════════════════════════════════════════════════════════════ -->
  <div class="levfin-page">

    <!-- ─── BasePageHeader ──────────────────────────────────────────────
      Dark purple header (#27007A = $tertiary). Left slot: breadcrumb.
      Right slot: search + avatar. Matches the Storybook Default story.
    ─────────────────────────────────────────────────────────────────── -->
    <BasePageHeader>
      <template #left-actions>
        <span class="levfin-page__breadcrumb">
          <span class="levfin-page__breadcrumb--light">Octus&nbsp;|&nbsp;</span>
          <span class="levfin-page__breadcrumb--bold">Leveraged Finance</span>
        </span>
      </template>
      <template #right-actions>
        <div class="levfin-page__header-right">
          <div class="levfin-page__header-search">
            <BaseSearch
              nav
              placeholder="Search deals, issuers, sponsors…"
              max-width="280px"
            />
          </div>
          <BaseButton nav @click="() => {}">
            ✦ Ask CreditAI
          </BaseButton>
          <div class="levfin-page__avatar">TR</div>
        </div>
      </template>
    </BasePageHeader>

    <!-- ─── Page body ───────────────────────────────────────────────── -->
    <div class="levfin-page__body">

      <!-- ─── BaseTabPanel — top-level page tabs ───────────────────────
        Uses dark-mode tabs so the active tab yellow underline shows on
        the dark background that follows the header.
        Tabs: Dashboard | Pipeline | Comps | Issuers | Sponsors | History | News
      ──────────────────────────────────────────────────────────────── -->
      <BaseTabPanel
        v-model="activeTab"
        :tabs="pageTabs"
        hide-footer
        no-padding
        width="100%"
        height="100%"
        :large="true"
      >
        <!-- ── Dashboard tab ─────────────────────────────────────────── -->
        <template #[`content-dashboard`]>
          <div class="levfin-tab-content">

            <!-- KPI strip -->
            <div class="levfin-kpi-strip">
              <BaseCard
                v-for="kpi in kpis"
                :key="kpi.label"
                no-padding
                class="levfin-kpi-strip__card"
              >
                <template #content>
                  <div class="levfin-kpi-strip__value" :style="{ color: kpi.color }">
                    {{ kpi.value }}
                  </div>
                  <div class="levfin-kpi-strip__label">{{ kpi.label }}</div>
                </template>
              </BaseCard>
            </div>

            <div class="levfin-dashboard-grid">
              <!-- Main column -->
              <div class="levfin-dashboard-grid__main">

                <!-- AI search — BaseCard with ai-layout gradient border -->
                <BaseCard no-padding :ai-layout="true" class="levfin-ai-search">
                  <template #content>
                    <div class="levfin-ai-search__inner">
                      <div class="levfin-ai-search__icon">AI</div>
                      <input
                        class="levfin-ai-search__input"
                        placeholder="Ask anything about leveraged finance markets…"
                      />
                    </div>
                    <div class="levfin-ai-search__chips">
                      <BaseTag
                        v-for="chip in aiChips"
                        :key="chip"
                        :color-style="1"
                        small
                      >
                        {{ chip }}
                      </BaseTag>
                    </div>
                  </template>
                </BaseCard>

                <!-- Metrics bar — BaseCard, one cell per metric -->
                <BaseCard no-padding class="levfin-metrics">
                  <template #content>
                    <div class="levfin-metrics__grid">
                      <div
                        v-for="(m, i) in metrics"
                        :key="m.label"
                        class="levfin-metrics__cell"
                        :class="{ 'levfin-metrics__cell--last': i === metrics.length - 1 }"
                      >
                        <div class="levfin-metrics__label">{{ m.label }}</div>
                        <div class="levfin-metrics__value">{{ m.value }}</div>
                        <div
                          class="levfin-metrics__delta"
                          :class="{
                            'levfin-metrics__delta--up': m.up === true,
                            'levfin-metrics__delta--down': m.up === false,
                          }"
                        >
                          {{ m.delta }}
                        </div>
                      </div>
                    </div>
                  </template>
                </BaseCard>

                <!-- Pipeline table — BaseCard + BaseFiltersBar + table -->
                <BaseCard no-padding class="levfin-pipeline">
                  <template #title>
                    <div class="levfin-pipeline__title">New Issuance Pipeline</div>
                  </template>
                  <template #content>
                    <!-- BaseFiltersBar for search + sector filter -->
                    <BaseFiltersBar
                      v-model:search="search"
                      :filters="sectorFilters"
                      :filter-selection="filterSelection"
                      search-place-holder="Search issuer…"
                      hide-more-filters
                      @update:filter-selection="filterSelection = $event"
                      @reset-filters="onResetFilters"
                    />

                    <table class="levfin-table">
                      <thead>
                        <tr>
                          <th class="levfin-table__th levfin-table__th--left">Issuer</th>
                          <th class="levfin-table__th">Sector</th>
                          <th class="levfin-table__th">Type</th>
                          <th class="levfin-table__th">Size</th>
                          <th class="levfin-table__th">Spread</th>
                          <th class="levfin-table__th">OID</th>
                          <th class="levfin-table__th">RV vs Sector</th>
                          <th class="levfin-table__th">Status</th>
                          <th class="levfin-table__th">Comp</th>
                        </tr>
                      </thead>
                      <tbody>
                        <template v-for="deal in filteredDeals" :key="deal.id">
                          <tr
                            class="levfin-table__row"
                            @mouseenter="hoveredRow = deal.id"
                            @mouseleave="hoveredRow = null"
                            :class="{ 'levfin-table__row--hovered': hoveredRow === deal.id }"
                          >
                            <td class="levfin-table__td levfin-table__td--left">
                              <div class="levfin-table__issuer">
                                <button
                                  class="levfin-table__expand-btn"
                                  @click="toggleExpanded(deal.id)"
                                >
                                  {{ expandedRows.includes(deal.id) ? '▼' : '▶' }}
                                </button>
                                <span class="levfin-table__issuer-name">{{ deal.issuer }}</span>
                                <BaseTag v-if="deal.flex" :color-style="7" small>
                                  {{ deal.flex === 'Rev Flex' ? '↑ Rev Flex' : '↓ Flex Out' }}
                                </BaseTag>
                              </div>
                            </td>
                            <td class="levfin-table__td">
                              <BaseTag :color-style="7" small>{{ deal.sector }}</BaseTag>
                            </td>
                            <td class="levfin-table__td levfin-table__td--muted">{{ deal.type }}</td>
                            <td class="levfin-table__td levfin-table__td--bold">{{ deal.size }}</td>
                            <td class="levfin-table__td">{{ deal.spread }}</td>
                            <td class="levfin-table__td levfin-table__td--muted">{{ deal.oid }}</td>
                            <td class="levfin-table__td">
                              <BaseTag v-bind="deal.rv.tagProps" small>{{ deal.rv.label }}</BaseTag>
                            </td>
                            <td class="levfin-table__td">
                              <BaseTag v-bind="deal.status.tagProps" small>{{ deal.status.label }}</BaseTag>
                            </td>
                            <td class="levfin-table__td">
                              <BaseButton outlined small @click="openComp(deal)">
                                ✦ Comp
                              </BaseButton>
                            </td>
                          </tr>
                          <!-- Expanded row -->
                          <tr v-if="expandedRows.includes(deal.id)" class="levfin-table__expanded">
                            <td colspan="9">
                              <div class="levfin-expanded">
                                <BaseTabPanel
                                  v-model="expandedTab"
                                  :tabs="expandTabs"
                                  hide-footer
                                  no-padding
                                  width="100%"
                                  height="auto"
                                >
                                  <template #[`content-leverage`]>
                                    <div class="levfin-expanded__metrics">
                                      <div
                                        v-for="(lm, li) in leverageMetrics"
                                        :key="lm.label"
                                        class="levfin-expanded__metric"
                                        :class="{ 'levfin-expanded__metric--last': li === leverageMetrics.length - 1 }"
                                      >
                                        <div class="levfin-expanded__metric-label">{{ lm.label }}</div>
                                        <div class="levfin-expanded__metric-value">{{ lm.value }}</div>
                                      </div>
                                    </div>
                                  </template>
                                  <template #[`content-parties`]>
                                    <div class="levfin-expanded__placeholder">Parties panel</div>
                                  </template>
                                  <template #[`content-capital`]>
                                    <div class="levfin-expanded__placeholder">Capital Structure panel</div>
                                  </template>
                                </BaseTabPanel>
                              </div>
                            </td>
                          </tr>
                        </template>
                        <tr v-if="filteredDeals.length === 0">
                          <td colspan="9" class="levfin-table__empty">No deals match.</td>
                        </tr>
                      </tbody>
                    </table>

                    <!-- Pagination -->
                    <div class="levfin-pagination">
                      <span class="levfin-pagination__count">
                        {{ paginationLabel }}
                      </span>
                      <div class="levfin-pagination__btns">
                        <button
                          class="levfin-pagination__btn"
                          :disabled="page === 1"
                          @click="page = Math.max(1, page - 1)"
                        >‹</button>
                        <button
                          v-for="p in totalPages"
                          :key="p"
                          class="levfin-pagination__btn"
                          :class="{ 'levfin-pagination__btn--active': p === page }"
                          @click="page = p"
                        >{{ p }}</button>
                        <button
                          class="levfin-pagination__btn"
                          :disabled="page === totalPages"
                          @click="page = Math.min(totalPages, page + 1)"
                        >›</button>
                      </div>
                    </div>
                  </template>
                </BaseCard>
              </div>

              <!-- Right sidebar -->
              <div class="levfin-dashboard-grid__sidebar">

                <!-- Live Alerts — BaseCard -->
                <BaseCard no-padding class="levfin-alerts">
                  <template #title>
                    <div class="levfin-alerts__header">
                      <span>Live Alerts</span>
                      <span class="levfin-alerts__live">● Live</span>
                    </div>
                  </template>
                  <template #content>
                    <div
                      v-for="(a, i) in alerts"
                      :key="i"
                      class="levfin-alerts__item"
                      :class="{ 'levfin-alerts__item--last': i === alerts.length - 1 }"
                    >
                      <div class="levfin-alerts__meta">
                        <span class="levfin-alerts__time">{{ a.time }}</span>
                        <BaseTag v-bind="a.tagProps" small>{{ a.type }}</BaseTag>
                      </div>
                      <div class="levfin-alerts__text">{{ a.text }}</div>
                    </div>
                  </template>
                </BaseCard>

                <!-- Recent Trades — BaseCard -->
                <BaseCard no-padding class="levfin-trades">
                  <template #title>
                    <div class="levfin-trades__header">Recent Trades</div>
                  </template>
                  <template #content>
                    <div class="levfin-trades__col-headers">
                      <span class="levfin-trades__col-header levfin-trades__col-header--wide">Security</span>
                      <span class="levfin-trades__col-header">Side</span>
                      <span class="levfin-trades__col-header">Price</span>
                      <span class="levfin-trades__col-header">Chg</span>
                    </div>
                    <div
                      v-for="(t, i) in trades"
                      :key="i"
                      class="levfin-trades__row"
                      :class="{ 'levfin-trades__row--last': i === trades.length - 1 }"
                    >
                      <span class="levfin-trades__name">{{ t.name }}</span>
                      <BaseTag :success="t.action === 'BUY'" :danger="t.action === 'SELL'" small>{{ t.action }}</BaseTag>
                      <span class="levfin-trades__price">{{ t.price }}</span>
                      <span
                        class="levfin-trades__chg"
                        :class="{ 'levfin-trades__chg--up': t.chg.startsWith('+'), 'levfin-trades__chg--down': !t.chg.startsWith('+') }"
                      >{{ t.chg }}</span>
                    </div>
                  </template>
                </BaseCard>

              </div>
            </div>
          </div>
        </template>

        <!-- ── Pipeline tab ───────────────────────────────────────────── -->
        <template #[`content-pipeline`]>
          <div class="levfin-tab-content">
            <div class="levfin-kpi-strip">
              <BaseCard v-for="kpi in kpis" :key="kpi.label" no-padding class="levfin-kpi-strip__card">
                <template #content>
                  <div class="levfin-kpi-strip__value" :style="{ color: kpi.color }">{{ kpi.value }}</div>
                  <div class="levfin-kpi-strip__label">{{ kpi.label }}</div>
                </template>
              </BaseCard>
            </div>
            <BaseCard no-padding>
              <template #title><div class="levfin-pipeline__title">New Issuance Pipeline</div></template>
              <template #content>
                <div class="levfin-pipeline__coming-soon">Full pipeline table — see Dashboard tab</div>
              </template>
            </BaseCard>
          </div>
        </template>

        <!-- ── Remaining tabs — coming soon placeholders ─────────────── -->
        <template v-for="tab in ['comps','issuers','sponsors','history','news']" #[`content-${tab}`] :key="tab">
          <div class="levfin-coming-soon">
            {{ pageTabs.find(t => t.id === tab)?.label }} — coming soon
          </div>
        </template>

      </BaseTabPanel>
    </div>

  </div>
</template>

<script>
import { ref, computed } from 'vue'
import BasePageHeader from '@reorg-research/frontend-global-components/src/components/base-page-header/BasePageHeader.vue'
import BaseCard from '@reorg-research/frontend-global-components/src/components/base-card/BaseCard.vue'
import BaseTabPanel from '@reorg-research/frontend-global-components/src/components/base-tab-panel/BaseTabPanel.vue'
import BaseTag from '@reorg-research/frontend-global-components/src/components/base-tag/BaseTag.vue'
import BaseButton from '@reorg-research/frontend-global-components/src/components/base-button/BaseButton.vue'
import BaseFiltersBar from '@reorg-research/frontend-global-components/src/components/base-filters-bar/BaseFiltersBar.vue'
import BaseSearch from '@reorg-research/frontend-global-components/src/components/base-search/BaseSearch.vue'

const RAW_DEALS = [
  { id:1,  issuer:'Apex Group',              sector:'Healthcare',  flex:'Rev Flex', type:'TLB', size:'$1,750M', spread:'S+425', oid:'99.5', rv:{ label:'-12bps Rich',   tagProps:{ danger: true  } }, status:{ label:'Pricing Today', tagProps:{ info:    true  } } },
  { id:2,  issuer:'Meridian Tech Solutions',  sector:'Technology',  flex:null,       type:'TLB', size:'$1,200M', spread:'S+420', oid:'99.5', rv:{ label:'+8bps Cheap',   tagProps:{ success: true  } }, status:{ label:'Pricing Today', tagProps:{ info:    true  } } },
  { id:3,  issuer:'ClearPath Logistics',      sector:'Industrials', flex:'Flex Out',  type:'TLB', size:'$1,320M', spread:'S+425', oid:'99.5', rv:{ label:'+35bps Cheap',  tagProps:{ success: true  } }, status:{ label:'Books Open',    tagProps:{ warn:    true  } } },
  { id:4,  issuer:'Vantage Consumer Brands',  sector:'Consumer',    flex:null,        type:'TL',  size:'$1,770M', spread:'S+425', oid:'99.5', rv:{ label:'At Market',     tagProps:{ colorStyle: 4   } }, status:{ label:'Priced',        tagProps:{ success: true  } } },
  { id:5,  issuer:'Stratos Energy Partners',  sector:'Energy',      flex:null,        type:'TL',  size:'$1,750M', spread:'S+425', oid:'99.5', rv:{ label:'TBD',           tagProps:{ colorStyle: 7   } }, status:{ label:'Roadshow',      tagProps:{ colorStyle: 7   } } },
  { id:6,  issuer:'Beta Innovations Ltd.',    sector:'Software',    flex:'Rev Flex',  type:'TL',  size:'$1,330M', spread:'S+425', oid:'99.5', rv:{ label:'TBD',           tagProps:{ colorStyle: 7   } }, status:{ label:'Announced',     tagProps:{ colorStyle: 7   } } },
  { id:7,  issuer:'Helix Pharma Group',       sector:'Healthcare',  flex:null,        type:'TLB', size:'$2,100M', spread:'S+400', oid:'99.0', rv:{ label:'-5bps Rich',    tagProps:{ danger: true  } }, status:{ label:'Pricing Today', tagProps:{ info:    true  } } },
  { id:8,  issuer:'Nexus Software Inc.',      sector:'Software',    flex:'Rev Flex',  type:'TLB', size:'$980M',   spread:'S+450', oid:'99.0', rv:{ label:'+20bps Cheap',  tagProps:{ success: true  } }, status:{ label:'Books Open',    tagProps:{ warn:    true  } } },
  { id:9,  issuer:'Cascade Health Systems',   sector:'Healthcare',  flex:null,        type:'TL',  size:'$2,300M', spread:'S+390', oid:'99.0', rv:{ label:'-18bps Rich',   tagProps:{ danger: true  } }, status:{ label:'Pricing Today', tagProps:{ info:    true  } } },
  { id:10, issuer:'Titan Energy Holdings',    sector:'Energy',      flex:null,        type:'TL',  size:'$1,900M', spread:'S+480', oid:'98.0', rv:{ label:'+50bps Cheap',  tagProps:{ success: true  } }, status:{ label:'Books Open',    tagProps:{ warn:    true  } } },
]

export default {
  name: 'LevFinDashboard',
  components: { BasePageHeader, BaseCard, BaseTabPanel, BaseTag, BaseButton, BaseFiltersBar, BaseSearch },

  setup() {
    const activeTab   = ref('dashboard')
    const expandedTab = ref('leverage')
    const expandedRows = ref([])
    const hoveredRow  = ref(null)
    const search      = ref('')
    const filterSelection = ref({})
    const page        = ref(1)
    const PER_PAGE    = 5

    // ── Page tabs (fed into BaseTabPanel) ────────────────────────────
    const pageTabs = [
      { id: 'dashboard', label: 'Dashboard' },
      { id: 'pipeline',  label: 'Pipeline'  },
      { id: 'comps',     label: 'Comps'     },
      { id: 'issuers',   label: 'Issuers'   },
      { id: 'sponsors',  label: 'Sponsors'  },
      { id: 'history',   label: 'Historical Transactions' },
      { id: 'news',      label: 'News'      },
    ]

    // ── Expand-row tabs ──────────────────────────────────────────────
    const expandTabs = [
      { id: 'leverage', label: 'Leverage'          },
      { id: 'parties',  label: 'Parties'           },
      { id: 'capital',  label: 'Capital Structure' },
    ]

    // ── AI chips ─────────────────────────────────────────────────────
    const aiChips = ['HY spread trends', 'Apex deal comps', 'KKR pipeline', 'Fed impact']

    // ── Metrics bar ──────────────────────────────────────────────────
    const metrics = [
      { label:'HY Spread', value:'6.75%',  delta:'-2bps WoW',       up: false },
      { label:'IG Spread', value:'315bps', delta:'-8bps WoW',        up: false },
      { label:'HY Index',  value:'$99.57', delta:'-1.11 vs. 1mo',    up: false },
      { label:'Loan Idx',  value:'$90.0',  delta:'-556bps vs broad', up: false },
      { label:'10Y UST',   value:'3.66%',  delta:'Fed on hold',      up: null  },
      { label:'S&P 500',   value:'6,910',  delta:'+1.1% WoW',        up: true  },
    ]

    // ── KPI strip ────────────────────────────────────────────────────
    const kpis = computed(() => [
      { label:'Deals In Market', value: RAW_DEALS.length,                                                    color:'#4B3DE3' },
      { label:'Pricing Today',   value: RAW_DEALS.filter(d => d.status.label==='Pricing Today').length,     color:'#4B3DE3' },
      { label:'Books Open',      value: RAW_DEALS.filter(d => d.status.label==='Books Open').length,        color:'#856404' },
      { label:'Total Volume',    value:'$' + (RAW_DEALS.reduce((s,d)=>s+parseFloat(d.size.replace(/[$,M]/g,'')),0)/1000).toFixed(1)+'B', color:'#007E45' },
      { label:'Avg Spread',      value:'S+' + Math.round(RAW_DEALS.reduce((s,d)=>s+parseInt(d.spread.replace('S+','')),0)/RAW_DEALS.length), color:'#1A1A1A' },
    ])

    // ── Leverage expand metrics ───────────────────────────────────────
    const leverageMetrics = [
      { label:'Entry EV/EBITDA', value:'13.2x' },
      { label:'Total Debt/EBITDA', value:'6.4x' },
      { label:'Interest Coverage', value:'2.1x' },
      { label:'FCF Yield', value:'5.8%' },
    ]

    // ── Alerts ───────────────────────────────────────────────────────
    const alerts = [
      { time:'09:14', type:'PRICING', text:'Apex Instruments $1.2B TLB priced at S+412 (tighter than S+425 talk)', tagProps:{ warn:    true } },
      { time:'08:52', type:'LAUNCH',  text:'Blackstone RE $2.1B Senior Notes launched at 98.5 OID',                tagProps:{ success: true } },
      { time:'08:31', type:'UPDATE',  text:'KKR Portfolio Co. roadshow oversubscribed 3.2x — books close noon',    tagProps:{ info:    true } },
      { time:'07:55', type:'DELAY',   text:'Apollo PIK deal delayed — credit committee revision pending',           tagProps:{ danger:  true } },
      { time:'07:22', type:'RATING',  text:"Moody's affirms Carlyle portfolio co. at B1, stable outlook",         tagProps:{ colorStyle: 7 } },
    ]

    // ── Trades ───────────────────────────────────────────────────────
    const trades = [
      { name:'Apex 2031 TLB',    action:'BUY',  price:'99.25', chg:'+0.12' },
      { name:'KKR HoldCo Sr.',   action:'SELL', price:'98.75', chg:'-0.38' },
      { name:'Blackstone RE 28', action:'BUY',  price:'97.50', chg:'+0.25' },
      { name:'Apollo PIK 2030',  action:'SELL', price:'94.00', chg:'-1.25' },
    ]

    // ── Filters for BaseFiltersBar ────────────────────────────────────
    const sectorFilters = [
      {
        id: 'sector',
        label: 'Sector',
        type: 'multi-select',
        options: ['Healthcare','Technology','Software','Energy','Consumer','Industrials'].map(s => ({ value: s, label: s })),
      },
      {
        id: 'status',
        label: 'Status',
        type: 'multi-select',
        options: ['Pricing Today','Books Open','Roadshow','Announced','Priced'].map(s => ({ value: s, label: s })),
      },
    ]

    // ── Filtered + paginated deals ────────────────────────────────────
    const filteredDeals = computed(() => {
      let deals = RAW_DEALS
      if (search.value) {
        deals = deals.filter(d => d.issuer.toLowerCase().includes(search.value.toLowerCase()))
      }
      if (filterSelection.value?.sector?.length) {
        deals = deals.filter(d => filterSelection.value.sector.includes(d.sector))
      }
      if (filterSelection.value?.status?.length) {
        deals = deals.filter(d => filterSelection.value.status.includes(d.status.label))
      }
      page.value = 1
      return deals.slice((page.value - 1) * PER_PAGE, page.value * PER_PAGE)
    })

    const totalPages = computed(() => Math.max(1, Math.ceil(
      RAW_DEALS.filter(d => {
        let ok = true
        if (search.value) ok = ok && d.issuer.toLowerCase().includes(search.value.toLowerCase())
        return ok
      }).length / PER_PAGE
    )))

    const paginationLabel = computed(() => {
      const total = filteredDeals.value.length
      return `${Math.min((page.value-1)*PER_PAGE+1, total)}–${Math.min(page.value*PER_PAGE, total)} of ${total}`
    })

    function toggleExpanded(id) {
      const idx = expandedRows.value.indexOf(id)
      if (idx === -1) expandedRows.value.push(id)
      else expandedRows.value.splice(idx, 1)
    }

    function onResetFilters() {
      filterSelection.value = {}
      search.value = ''
    }

    function openComp(deal) {
      console.log('Comp clicked', deal.issuer)
    }

    return {
      activeTab, expandedTab, expandedRows, hoveredRow,
      search, filterSelection, page, totalPages, paginationLabel,
      pageTabs, expandTabs, aiChips,
      metrics, kpis, leverageMetrics,
      alerts, trades, sectorFilters,
      filteredDeals,
      toggleExpanded, onResetFilters, openComp,
    }
  },
}
</script>

<style scoped lang="scss">
/* ─── Token aliases (mirrors GC style.scss values exactly) ─────────────── */
$tertiary:      #27007A; // BasePageHeader bg
$primary:       #4B3DE3;
$secondary:     #454545; // inactive text
$g-200:         #D9D9D9; // card border
$y-600:         #E8A200; // tab active underline
$success-text:  #007E45;
$danger-text:   #B91C1C;
$warn-text:     #856404;
$info-text:     #1D4ED8;
$text-default:  #1A1A1A;
$bg-default:    #F5F5F5;
$surface-white: #FFFFFF;
$ice:           #EEF0FF;
$font:          'Inter', 'Helvetica Neue', Arial, sans-serif;

.levfin-page {
  display: flex;
  flex-direction: column;
  height: 100vh;
  font-family: $font;
  font-size: 12px;
  color: $text-default;
  background: $bg-default;
  overflow: hidden;

  &__breadcrumb {
    font-size: 14px;
    &--light  { font-weight: 300; }
    &--bold   { font-weight: 700; }
  }

  &__header-right {
    display: flex;
    align-items: center;
    gap: 10px;
    width: 100%;
    justify-content: flex-end;
  }
  &__header-search { min-width: 0; }

  &__avatar {
    width: 28px; height: 28px; border-radius: 50%;
    background: rgba(255,255,255,0.25);
    display: flex; align-items: center; justify-content: center;
    font-size: 11px; font-weight: 700; color: #fff;
    flex-shrink: 0;
  }

  &__body {
    flex: 1;
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }
}

/* BaseTabPanel overrides — make the tab row full-width page nav */
:deep(.r-base-tab-panel) { height: 100%; display: flex; flex-direction: column; }
:deep(.r-base-card--content) { flex: 1; overflow: auto; }

.levfin-tab-content {
  padding: 12px 16px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

/* ── KPI strip ───────────────────────────────────────────────────────────── */
.levfin-kpi-strip {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;

  &__card { flex: 1; min-width: 90px; text-align: center; padding: 10px 14px; }
  &__value { font-size: 22px; font-weight: 700; line-height: 1.2; }
  &__label { font-size: 11px; color: $secondary; margin-top: 2px; }
}

/* ── Dashboard grid ──────────────────────────────────────────────────────── */
.levfin-dashboard-grid {
  display: flex;
  gap: 12px;
  flex: 1;
  min-height: 0;

  &__main    { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 10px; }
  &__sidebar { width: 280px; flex-shrink: 0; display: flex; flex-direction: column; gap: 10px; }
}

/* ── AI Search ───────────────────────────────────────────────────────────── */
.levfin-ai-search {
  &__inner {
    display: flex; align-items: center; gap: 10px; padding: 10px 12px;
  }
  &__icon {
    width: 24px; height: 24px; border-radius: 4px; flex-shrink: 0;
    background: linear-gradient(135deg, $primary, $y-600);
    display: flex; align-items: center; justify-content: center;
    font-size: 11px; font-weight: 800; color: #fff;
  }
  &__input {
    flex: 1; border: none; outline: none;
    font-family: $font; font-size: 12px; background: transparent;
  }
  &__chips {
    display: flex; gap: 6px; flex-wrap: wrap;
    padding: 0 12px 10px;
  }
}

/* ── Metrics bar ─────────────────────────────────────────────────────────── */
.levfin-metrics {
  &__grid {
    display: flex;
  }
  &__cell {
    flex: 1; padding: 10px 10px 8px;
    border-right: 1px solid $g-200;
    &--last { border-right: none; }
  }
  &__label  { font-size: 10px; color: $secondary; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 3px; }
  &__value  { font-size: 17px; font-weight: 700; line-height: 1.15; margin-bottom: 2px; }
  &__delta  { font-size: 11px; color: $secondary; }
  &__delta--up   { color: $success-text; }
  &__delta--down { color: $danger-text;  }
}

/* ── Pipeline card ───────────────────────────────────────────────────────── */
.levfin-pipeline {
  &__title { font-size: 14px; font-weight: 700; padding: 10px 12px 0; }
  &__coming-soon { padding: 24px; text-align: center; color: $secondary; }
}

/* ── Table (matches GC table patterns — 2px header border, no zebra) ─────── */
.levfin-table {
  width: 100%; border-collapse: collapse; font-size: 12px;

  &__th {
    padding: 6px 8px; font-size: 12px; font-weight: 700;
    color: $text-default; background: $surface-white;
    border-bottom: 2px solid $text-default;
    white-space: nowrap; text-align: right;
    &--left { text-align: left; }
  }

  &__td {
    padding: 6px 8px; text-align: right; white-space: nowrap;
    border-bottom: 1px solid $g-200;
    &--left  { text-align: left; }
    &--muted { color: $secondary; }
    &--bold  { font-weight: 600; }
  }

  &__row { background: $surface-white; }
  &__row--hovered .levfin-table__td { background: $ice; }
  &__expanded td { background: $ice; }
  &__empty { padding: 24px; text-align: center; color: $secondary; }

  &__issuer {
    display: flex; align-items: center; gap: 6px;
  }
  &__issuer-name { color: $primary; font-weight: 500; }
  &__expand-btn {
    background: none; border: none; cursor: pointer;
    font-size: 9px; color: $primary; padding: 0; line-height: 1;
  }
}

/* ── Expanded row panel ──────────────────────────────────────────────────── */
.levfin-expanded {
  margin: 6px 14px 10px 32px;

  &__metrics {
    display: flex;
  }
  &__metric {
    flex: 1; padding: 10px 12px;
    border-right: 1px solid $g-200;
    &--last { border-right: none; }
  }
  &__metric-label { font-size: 10px; color: $secondary; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 3px; }
  &__metric-value { font-size: 16px; font-weight: 700; }
  &__placeholder  { padding: 14px 12px; font-size: 12px; color: $secondary; }
}

/* ── Pagination ──────────────────────────────────────────────────────────── */
.levfin-pagination {
  display: flex; justify-content: space-between; align-items: center;
  padding: 8px 12px; border-top: 1px solid $g-200;

  &__count { font-size: 12px; color: $secondary; }
  &__btns  { display: flex; gap: 4px; }
  &__btn {
    width: 24px; height: 24px; border-radius: 50%;
    border: 1px solid $primary; background: $surface-white;
    color: $primary; font-size: 11px; cursor: pointer;
    display: flex; align-items: center; justify-content: center;
    &:disabled { opacity: 0.35; cursor: default; }
    &--active  { background: $ice; font-weight: 700; }
  }
}

/* ── Alerts ──────────────────────────────────────────────────────────────── */
.levfin-alerts {
  &__header {
    display: flex; align-items: center; justify-content: space-between;
    padding: 8px 12px 0; font-size: 14px; font-weight: 700;
  }
  &__live { font-size: 11px; font-weight: 600; color: #007E45; }
  &__item {
    padding: 7px 12px;
    border-bottom: 1px solid $g-200;
    &--last { border-bottom: none; }
  }
  &__meta  { display: flex; align-items: center; gap: 6px; margin-bottom: 3px; }
  &__time  { font-size: 10px; color: $secondary; }
  &__text  { font-size: 11px; line-height: 1.45; }
}

/* ── Recent Trades ───────────────────────────────────────────────────────── */
.levfin-trades {
  &__header { padding: 8px 12px 0; font-size: 14px; font-weight: 700; }
  &__col-headers {
    display: flex; padding: 6px 12px;
    border-bottom: 2px solid $text-default;
  }
  &__col-header { font-size: 11px; font-weight: 700; flex: 1; }
  &__col-header--wide { flex: 2; }
  &__row {
    display: flex; align-items: center; padding: 6px 12px;
    border-bottom: 1px solid $g-200;
    &--last { border-bottom: none; }
  }
  &__name  { flex: 2; font-size: 11px; font-weight: 500; }
  &__price { flex: 1; font-size: 11px; }
  &__chg   { flex: 1; font-size: 11px; font-weight: 600; }
  &__chg--up   { color: $success-text; }
  &__chg--down { color: $danger-text;  }
}

/* ── Coming soon placeholder ─────────────────────────────────────────────── */
.levfin-coming-soon {
  display: flex; align-items: center; justify-content: center;
  height: 200px; color: $secondary; font-size: 14px;
}
</style>
