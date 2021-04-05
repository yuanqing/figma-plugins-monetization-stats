const plugins = require('./plugins').plugins
const pluginTypes = require('./plugin-types')

const formatNumber = new Intl.NumberFormat('en-US').format
const formatPercent = new Intl.NumberFormat('en-US', {
  style: 'percent',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
}).format

function main () {
  const result = {
    Free: { plugins: [], installCount: 0, likeCount: 0 },
    'Free with funding link': { plugins: [], installCount: 0, likeCount: 0 },
    Paid: { plugins: [], installCount: 0, likeCount: 0 }
  }
  const totals = { plugins, installCount: 0, likeCount: 0 }
  for (const plugin of plugins) {
    const pluginType = pluginTypes[plugin.id]
    if (pluginType === 0 || pluginType === 1) {
      result['Free'].plugins.push(plugin)
      result['Free'].installCount += plugin.installCount
      result['Free'].likeCount += plugin.likeCount
    }
    if (pluginType === 1) {
      result['Free with funding link'].plugins.push(plugin)
      result['Free with funding link'].installCount += plugin.installCount
      result['Free with funding link'].likeCount += plugin.likeCount
    }
    if (pluginType === 2) {
      result['Paid'].plugins.push(plugin)
      result['Paid'].installCount += plugin.installCount
      result['Paid'].likeCount += plugin.likeCount
    }
    totals.installCount += plugin.installCount
    totals.likeCount += plugin.likeCount
  }
  console.log('# Figma Plugins Monetization Stats')
  console.log()
  console.log('## Stats')
  console.log()
  console.log('| | Plugin count | Installs | Likes |')
  console.log('|:-|:-|:-|:-|')
  printStats('Free', result['Free'], totals)
  printStats('Paid', result['Paid'], totals)
  printStats('Totals', totals, totals)
  console.log()
  console.log('## Plugins')
  console.log()
  printPluginList(
    'Free with funding link',
    result['Free with funding link'].plugins
  )
  console.log()
  printPluginList('Paid', result['Paid'].plugins)
  console.log()
  console.log('## See also')
  console.log()
  console.log(
    `- [Figma Plugins Stats](https://github.com/yuanqing/figma-plugins-stats)`
  )
}
main()

function printStats (label, stats, totals) {
  const result = [
    `**${label}**`,
    `${formatNumber(stats.plugins.length)} (${formatPercent(
      stats.plugins.length / totals.plugins.length
    )})`,
    `${formatNumber(stats.installCount)} (${formatPercent(
      stats.installCount / totals.installCount
    )})`,
    `${formatNumber(stats.likeCount)} (${formatPercent(
      stats.likeCount / totals.likeCount
    )})`
  ].join(' | ')
  console.log(`| ${result} |`)
}

function printPluginList (label, plugins) {
  console.log(`### ${label}`)
  console.log()
  console.log(`*${formatNumber(plugins.length)} plugins*`)
  console.log()
  for (const plugin of plugins) {
    console.log(
      `- **[${plugin.name}](https://figma.com/community/plugin/${plugin.id})** by [@${plugin.publisherHandle}](https://figma.com/@${plugin.publisherHandle})`
    )
  }
}
