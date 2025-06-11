;(function () {
  "use strict"
  var n9wjihaje10vlvbfxe69 = [
      {
        srcId: 1288,
        WriteKey: "n9wjihaje10vlvbfxe69",
        ConfigJson: { name: "Google AD" },
        CDPDestinationId: 12,
        Id: 6543,
        VizVrmId: "VIZVRM6543",
        DestinationStatus: "ACTIVE",
        DestinationInstanceId: 1041,
      },
    ],
    sourceDestinationsInstanceMapping = { n9wjihaje10vlvbfxe69: n9wjihaje10vlvbfxe69 },
    CreditCardEvent = {
      Id: 6228,
      CampaignId: 6543,
      EventName: "CreditCardEvent",
      EventDescription: "CreditCardEvent",
      EventType: "track",
      EventProperties: '[{"name":"CreditCardType","description":"CreditCardType","type":"STRING"}]',
      AllowedDestinationInstanceList: "[1054]",
      IsActive: 1,
      Type: null,
      LemEventName: null,
      CreatedBy: 3876,
      UpdatedBy: 3876,
      CreatedOn: "2025-01-14T14:08:38.000Z",
      UpdatedOn: "2025-01-14T14:09:27.000Z",
      TransformerFunction: null,
    },
    Demotest = {
      Id: 6231,
      CampaignId: 6543,
      EventName: "Demotest",
      EventDescription: "SanityDemo",
      EventType: "track",
      EventProperties: '[{"name":"Name","description":"Name","type":"STRING"}]',
      AllowedDestinationInstanceList: "[1058]",
      IsActive: 1,
      Type: null,
      LemEventName: null,
      CreatedBy: 4069,
      UpdatedBy: 4087,
      CreatedOn: "2025-01-27T12:22:34.000Z",
      UpdatedOn: "2025-01-27T13:44:10.000Z",
      TransformerFunction: null,
    },
    Test = {
      Id: 6233,
      CampaignId: 6543,
      EventName: "Test",
      EventDescription: "Test",
      EventType: "track",
      EventProperties: '[{"name":"Name","description":"Name","type":"NUMBER"}]',
      AllowedDestinationInstanceList: "[]",
      IsActive: 0,
      Type: null,
      LemEventName: null,
      CreatedBy: 4069,
      UpdatedBy: 4069,
      CreatedOn: "2025-01-31T09:05:17.000Z",
      UpdatedOn: "2025-01-31T09:05:54.000Z",
      TransformerFunction: {},
    },
    Feb5Event = {
      Id: 6235,
      CampaignId: 6543,
      EventName: "Feb5Event",
      EventDescription: "Feb5Event",
      EventType: "track",
      EventProperties: '[{"name":"Name","description":"Uma","type":"STRING"}]',
      AllowedDestinationInstanceList: "[1058]",
      IsActive: 1,
      Type: null,
      LemEventName: null,
      CreatedBy: 4069,
      UpdatedBy: 4069,
      CreatedOn: "2025-02-05T10:56:58.000Z",
      UpdatedOn: "2025-02-05T10:57:51.000Z",
      TransformerFunction: null,
    },
    test1 = {
      Id: 6236,
      CampaignId: 6543,
      EventName: "test1",
      EventDescription: "test1",
      EventType: "track",
      EventProperties: "[]",
      AllowedDestinationInstanceList: "[]",
      IsActive: 0,
      Type: null,
      LemEventName: null,
      CreatedBy: 4069,
      UpdatedBy: null,
      CreatedOn: "2025-02-05T11:23:22.000Z",
      UpdatedOn: null,
      TransformerFunction: {},
    },
    eventDestinationMapping = {
      CreditCardEvent: CreditCardEvent,
      Demotest: Demotest,
      Test: Test,
      "xz cx": {
        Id: 6234,
        CampaignId: 6543,
        EventName: "xz cx",
        EventDescription: "vvc c",
        EventType: "track",
        EventProperties: "[]",
        AllowedDestinationInstanceList: "[]",
        IsActive: 0,
        Type: null,
        LemEventName: null,
        CreatedBy: 4069,
        UpdatedBy: null,
        CreatedOn: "2025-01-31T14:41:50.000Z",
        UpdatedOn: null,
        TransformerFunction: {},
      },
      Feb5Event: Feb5Event,
      test1: test1,
    }
  const LOG_LEVEL_INFO = 1,
    LOG_LEVEL_DEBUG = 2,
    LOG_LEVEL_WARN = 3,
    LOG_LEVEL_ERROR = 4
  let LOG_LEVEL = "1"
  const logger = {
    setLogLevel(e) {
      switch (e.toUpperCase()) {
        case "INFO":
          return void (LOG_LEVEL = LOG_LEVEL_INFO)
        case "DEBUG":
          return void (LOG_LEVEL = LOG_LEVEL_DEBUG)
        case "WARN":
          LOG_LEVEL = LOG_LEVEL_WARN
      }
    },
    info() {
      LOG_LEVEL <= LOG_LEVEL_INFO && console.log(...arguments)
    },
    debug() {
      LOG_LEVEL <= LOG_LEVEL_DEBUG && console.log(...arguments)
    },
    warn() {
      LOG_LEVEL <= LOG_LEVEL_WARN && console.log(...arguments)
    },
    error() {
      LOG_LEVEL <= LOG_LEVEL_ERROR && console.log(...arguments)
    },
  }
  class FacebookPixel {
    constructor(e) {
      this.FacebookPixelId = e
    }
    init() {
      ;(window._fbq = function () {
        window.fbq.callMethod ? window.fbq.callMethod.apply(window.fbq, arguments) : window.fbq.queue.push(arguments)
      }),
        (window.fbq = window.fbq || window._fbq),
        (window.fbq.push = window.fbq),
        (window.fbq.loaded = !0),
        (window.fbq.disablePushState = !0),
        (window.fbq.allowDuplicatePageViews = !0),
        (window.fbq.version = "2.0"),
        (window.fbq.queue = []),
        logger.debug("===In facebook init==="),
        window.fbq("init", this.FacebookPixelId),
        window.fbq("track", "PageView")
      var e = document.createElement("script")
      ;(e.type = "text/javascript"),
        (e.id = "facebookPixel"),
        (e.async = !0),
        (e.src = "https://connect.facebook.net/en_US/fbevents.js")
      const t = document.getElementsByTagName("script")[0]
      t.parentNode.insertBefore(e, t)
    }
    page(e) {
      logger.debug("===In facebook page==="), window.fbq("page", e.event, e.properties)
    }
    track(e) {
      logger.debug("===In facebook track==="), window.fbq("track", e.event, e.properties)
    }
    identify(e) {
      logger.debug("===In facebook identify==="), window.fbq("identify", e.userId, e.properties)
    }
  }
  class QuoraPixel {
    constructor(e) {
      this.quoraPixelId = e
    }
    init() {
      logger.debug("===In quora init===")
      var e = document.createElement("script")
      ;(e.type = "text/javascript"),
        (e.text = `!function(e,t,n,c,a,p){e.qp||((c=e.qp=function(){c.qp?c.qp.apply(c,arguments):c.queue.push(arguments)}).queue=[],(a=document.createElement(t)).async=!0,a.src="https://a.quora.com/qevents.js",(p=document.getElementsByTagName(t)[0]).parentNode.insertBefore(a,p))}(window,"script"),qp("init", "${this.quoraPixelId}"),qp("track","ViewContent");`)
      document.getElementsByTagName("head")[0].appendChild(e)
    }
    track(e) {
      logger.debug("===In quora track==="), window.qp("track", e.event)
    }
  }
  class GoogleAds {
    constructor(e) {
      this.conversionId = e
    }
    init() {
      !(function (e, t, n) {
        const i = n.createElement("script")
        ;(i.src = t), (i.async = 1), (i.type = "text/javascript"), (i.id = "googleAds-integration")
        n.getElementsByTagName("head")[0].appendChild(i)
      })(0, `https://www.googletagmanager.com/gtag/js?id=${this.conversionId}`, document),
        logger.debug("===In gAds init==="),
        (window.dataLayer = window.dataLayer || []),
        (window.gtag = function () {
          window.dataLayer.push(arguments)
        }),
        window.gtag("js", new Date()),
        window.gtag("config", this.conversionId)
    }
    track(e) {
      logger.debug("===In gAds track==="), window.gtag("event", e.event, e.properties)
    }
    page(e) {
      logger.debug("===In gAds page==="), window.gtag("event", e.event, e.properties)
    }
    identify(e) {
      logger.debug("[GoogleAds] identify:: method not supported")
    }
  }
  const defaultAsyncState = !0,
    ScriptLoader = (e, t, n = defaultAsyncState) => {
      logger.debug(`in script loader=== ${e}`)
      const i = document.createElement("script")
      ;(i.src = t), (i.async = void 0 === n ? defaultAsyncState : n), (i.type = "text/javascript"), (i.id = e)
      const a = document.getElementsByTagName("head")
      if (0 !== a.length) logger.debug("==adding script==", i), a[0].insertBefore(i, a[0].firstChild)
      else {
        const e = document.getElementsByTagName("script")[0]
        logger.debug("==parent script==", e), logger.debug("==adding script==", i), e.parentNode.insertBefore(i, e)
      }
    }
  class Clevertap {
    constructor(e) {
      this.accountId = e
    }
    init() {
      logger.debug("===in init Clevertap===")
      const e =
        "https:" == document.location.protocol
          ? "https://d2r1yp2w7bby2u.cloudfront.net/js/a.js"
          : "http://static.clevertap.com/js/a.js"
      ;(window.clevertap = { event: [], profile: [], account: [], onUserLogin: [], notifications: [], privacy: [] }),
        window.clevertap.account.push({ id: this.accountId }),
        window.clevertap.privacy.push({ optOut: !1 }),
        window.clevertap.privacy.push({ useIP: !1 }),
        ScriptLoader("clevertap-integration", e)
    }
    identify(e) {
      logger.debug("in clevertap identify"), window.clevertap.onUserLogin.push({ Site: e.properties })
    }
    track(e) {
      logger.debug("in clevertap track"), window.clevertap.event.push(e.event, e.properties)
    }
    page(e) {
      logger.debug("in clevertap page"), window.clevertap.event.push(e.event, e.properties)
    }
  }
  class Hotjar {
    constructor(e) {
      this.siteId = e
    }
    init() {
      var e, t, n, i
      logger.debug("===In init Hotjar==="),
        (window.hotjarSiteId = this.siteId),
        (e = window),
        (t = document),
        (e.hj =
          e.hj ||
          function () {
            ;(e.hj.q = e.hj.q || []).push(arguments)
          }),
        (e._hjSettings = { hjid: e.hotjarSiteId, hjsv: 6 }),
        (n = t.getElementsByTagName("head")[0]),
        ((i = t.createElement("script")).async = 1),
        (i.src = "https://static.hotjar.com/c/hotjar-" + e._hjSettings.hjid + ".js?sv=" + e._hjSettings.hjsv),
        n.appendChild(i),
        (this._ready = !0)
    }
    identify(e) {
      logger.debug("===In Hotjar identify==="), window.hj("identify", e.userId, e.properties)
    }
    track(e) {
      logger.debug("===In Hotjar track==="), window.hj("event", e.event, e.properties)
    }
    page() {
      logger.debug("===In Hotjar page==="), logger.debug("[Hotjar] page:: method not supported")
    }
  }
  class GA {
    constructor(e) {
      this.trackingID = e
    }
    init() {
      logger.debug("===in init GA==="),
        (window.GoogleAnalyticsObject = "ga"),
        (window.ga =
          window.ga ||
          function () {
            ;(window.ga.q = window.ga.q || []), window.ga.q.push(arguments)
          }),
        (window.ga.l = new Date().getTime()),
        ScriptLoader("ga", "https://www.google-analytics.com/analytics.js"),
        window.ga("create", this.trackingID, "auto")
    }
    identify(e) {
      logger.debug("===In GA identify==="), window.ga(e.userId, e.properties)
    }
    track(e) {
      logger.debug("===In GA track==="), window.ga(e.event, e.properties)
    }
    page(e) {
      logger.debug("===In GA page==="), window.ga(e.event, e.properties)
    }
  }
  class GA4 {
    constructor(e) {
      this.measurementId = e
    }
    init() {
      !(function (e, t, n) {
        const i = n.createElement("script")
        ;(i.src = t), (i.async = 1), (i.type = "text/javascript"), (i.id = "google-analytics 4")
        n.getElementsByTagName("head")[0].appendChild(i)
      })(0, `https://www.googletagmanager.com/gtag/js?id=${this.measurementId}&l=ga4DataLayer`, document),
        logger.debug("===In GA4 init==="),
        (window.ga4DataLayer = window.ga4DataLayer || []),
        (window.gtag = function () {
          window.ga4DataLayer.push(arguments)
        }),
        window.gtag("js", new Date()),
        window.gtag("config", this.measurementId)
    }
    identify(e) {
      logger.debug("===In GA4 identify==="), window.gtag("set", "user_properties", e.properties)
    }
    track(e) {
      logger.debug("===In GA4 track==="), window.gtag("event", e.event, e.properties)
    }
    page(e) {
      logger.debug("===In GA4 page==="), window.gtag("event", e.event, e.properties)
    }
  }
  class LinkedInInsightTag {
    constructor(e) {
      this.partnerId = e
    }
    init() {
      logger.debug("===in init LinkedIn Insight Tag==="),
        ScriptLoader("LinkedIn Insight Tag", "https://snap.licdn.com/li.lms-analytics/insight.min.js"),
        this.partnerId && (window._linkedin_data_partner_id = this.partnerId)
    }
    identify(e) {
      logger.debug("===In linkedin identify===")
    }
    track(e) {
      logger.debug("===In linkedin track===")
    }
    page(e) {
      logger.debug("===In linkedin page===")
    }
  }
  class Tiktok {
    constructor(e) {
      this.accountId = e
    }
    init() {
      const e = this.accountId
      logger.debug("===In tiktok init==="),
        (function (t, n, i) {
          t.TiktokAnalyticsObject = i
          var a = (t[i] = t[i] || [])
          ;(a.methods = ["page", "track", "identify"]),
            (a.setAndDefer = function (e, t) {
              e[t] = function () {
                e.push([t].concat(Array.prototype.slice.call(arguments, 0)))
              }
            })
          for (var o = 0; o < a.methods.length; o++) a.setAndDefer(a, a.methods[o])
          ;(a.instance = function (e) {
            for (var t = a._i[e] || [], n = 0; n < a.methods.length; n++) a.setAndDefer(t, a.methods[n])
            return t
          }),
            (a.load = function (e, t) {
              var o = "https://analytics.tiktok.com/i18n/pixel/events.js"
              ;(a._i = a._i || {}),
                (a._i[e] = []),
                (a._i[e]._u = o),
                (a._t = a._t || {}),
                (a._t[e] = +new Date()),
                (a._o = a._o || {}),
                (a._o[e] = t || {})
              var r = n.createElement("script")
              ;(r.type = "text/javascript"), (r.async = !0), (r.src = o + "?sdkid=" + e + "&lib=" + i)
              var s = n.getElementsByTagName("script")[0]
              s.parentNode.insertBefore(r, s)
            }),
            a.load(e),
            a.page()
        })(window, document, "ttq")
    }
    identify(e) {
      logger.debug("===In Tiktok identify==="), window.ttq.identify(e.event, e)
    }
    track(e) {
      logger.debug("===In Tiktok track==="), window.ttq.track(e.event, e)
    }
    page(e) {
      logger.debug("===In Tiktok page==="), window.ttq.page(e.event, e)
    }
  }
  class Criteo {
    constructor(e) {
      this.accountId = e
    }
    init() {
      logger.debug("===in init criteo==="),
        this.accountId
          ? ((window.criteo_q = window.criteo_q || []),
            ScriptLoader("Criteo", `//dynamic.criteo.com/js/ld/ld.js?a=${this.accountId}`),
            window.criteo_q.push({ event: "setAccount", account: this.accountId }))
          : logger.debug("Account ID missing")
    }
    identify(e) {
      logger.debug("in criteo identify")
    }
    track(e) {
      logger.debug("in criteo track"), window.criteo_q.push(e)
    }
    page(e) {
      logger.debug("in criteo page"), window.criteo_q.push(e)
    }
  }
  class Taboola {
    constructor(e) {
      this.accountId = e
    }
    init() {
      ;(window._tfa = window._tfa || []),
        logger.debug("===In taboola init==="),
        window._tfa.push({ notify: "event", name: "page_view", id: this.accountId })
      const e = `//cdn.taboola.com/libtrc/unip/${this.accountId}/tfa.js`
      !(function (e, t, n) {
        if (!e.getElementById(n)) {
          const i = e.createElement("script")
          ;(i.async = 1), (i.type = "text/javascript"), (i.src = t), (i.id = n)
          e.getElementsByTagName("head")[0].appendChild(i)
        }
      })(document, e, "tb_tfa_script")
    }
    identify(e) {
      logger.debug("===In Taboola identify==="), _tfa.push(e)
    }
    track(e) {
      logger.debug("===In Taboola track==="), _tfa.push(e)
    }
    page(e) {
      logger.debug("===In Taboola page==="), _tfa.push(e)
    }
  }
  const routeSwitch = function (e, t, n, i, a, o) {
      const [r] = t.destinations.filter(e => e.destinationInstanceId === o)
      if (!r) return null
      switch (i) {
        case "page":
          r.class.page(a, e)
          break
        case "track":
          r.class.track(a, e)
          break
        case "identify":
          r.class.identify(a, e)
      }
    },
    callTransformFunction = (transformationFunction, smtObj, version, transformAnalyzeDataToV3) => {
      "v1" === version || smtObj.jsonData
      const funcDef = transformationFunction
          .substring(transformationFunction.indexOf("{") + 1, transformationFunction.lastIndexOf("}"))
          .replace(/[\n\t\r]/g, ""),
        funcCon = event => {
          eval(funcDef)
        },
        updatedProperties = funcCon()
      return updatedProperties
    },
    routeEventDestination = function (e, t, n, i, a, o, r) {
      const s = a[e || t]
      let c = [],
        d = null
      const l = "v1" === o ? n.paramArray.srcid : n.writeKey
      if (!l) return null
      if (
        (i[l].map(e => {
          c.push({ destinationId: e.CDPDestinationId, destinationInstanceId: e.DestinationInstanceId })
        }),
        s && Object.keys(s).length > 0)
      ) {
        const e = JSON.parse(s.AllowedDestinationInstanceList)
        if (!s.IsActive) return null
        e.map(e => {
          let i = s.TransformerFunction[e] ? s.TransformerFunction[e] : null
          i && "object" == typeof i && (i = i[t]), i && (d = callTransformFunction(i, n, o, r))
          const a = c.filter(t => t.destinationInstanceId === e)
          if (a.length)
            switch (a[0].destinationId) {
              case 1:
                routeSwitch(o, n, "fb", t, d, e)
                break
              case 2:
                routeSwitch(o, n, "clevertap", t, d, e)
                break
              case 5:
                routeSwitch(o, n, "linkedin", t, d, e)
                break
              case 6:
                routeSwitch(o, n, "qp", t, d, e)
                break
              case 8:
                routeSwitch(o, n, "hotjar", t, d, e)
                break
              case 10:
                routeSwitch(o, n, "ga", t, d, e)
                break
              case 12:
                routeSwitch(o, n, "gAds", t, d, e)
                break
              case 18:
                routeSwitch(o, n, "tiktok", t, d, e)
                break
              case 19:
                routeSwitch(o, n, "ga4", t, d, e)
                break
              case 20:
                routeSwitch(o, n, "criteo", t, d, e)
                break
              case 21:
                routeSwitch(o, n, "taboola", t, d, e)
                break
              case 22:
                routeSwitch(o, n, "outbrain", t, d, e)
            }
        })
      }
    }
  class Outbrain {
    constructor(e) {
      this.marketerId = e
    }
    init() {
      logger.debug("===In Outbrain init===")
      var e = document.createElement("script")
      ;(e.type = "text/javascript"),
        (e.text = `!function(_window, _document) {\n        var OB_ADV_ID = '${this.marketerId}';\n        if (_window.obApi) {\n          var toArray = function(object) {\n            return Object.prototype.toString.call(object) === '[object Array]' ? object : [object];\n          };\n          _window.obApi.marketerId = toArray(_window.obApi.marketerId).concat(toArray(OB_ADV_ID));\n          return;\n        }\n        var api = _window.obApi = function() {\n          api.dispatch ? api.dispatch.apply(api, arguments) : api.queue.push(arguments);\n        };\n        api.version = '1.1';\n        api.loaded = true;\n        api.marketerId = OB_ADV_ID;\n        api.queue = [];\n        var tag = _document.createElement('script');\n        tag.async = true;\n        tag.src = '//amplify.outbrain.com/cp/obtp.js';\n        tag.type = 'text/javascript';\n        var script = _document.getElementsByTagName('script')[0];\n        script.parentNode.insertBefore(tag, script);\n      }(window, document);\n      obApi('page', 'PAGE_VIEW');`)
      document.getElementsByTagName("head")[0].appendChild(e)
    }
    track(e) {
      logger.debug("===In Outbrain track==="),
        e && e.properties ? window.obApi("track", e.event, e.properties) : window.obApi("track", e.event)
    }
  }
  var t, e
  ;(t = void 0),
    (e = function () {
      var e =
          ("undefined" != typeof crypto && crypto.getRandomValues && crypto.getRandomValues.bind(crypto)) ||
          ("undefined" != typeof msCrypto &&
            "function" == typeof msCrypto.getRandomValues &&
            msCrypto.getRandomValues.bind(msCrypto)),
        t = new Uint8Array(16)
      function n() {
        if (!e)
          throw new Error(
            "crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported",
          )
        return e(t)
      }
      for (var i = [], a = 0; a < 256; ++a) i.push((a + 256).toString(16).substr(1))
      return function (e, t, a) {
        "string" == typeof e && ((t = "binary" === e ? new Uint8Array(16) : null), (e = null))
        var o = (e = e || {}).random || (e.rng || n)()
        if (((o[6] = (15 & o[6]) | 64), (o[8] = (63 & o[8]) | 128), t)) {
          for (var r = a || 0, s = 0; s < 16; ++s) t[r + s] = o[s]
          return t
        }
        return (function (e) {
          var t = i
          return (
            t[e[0]] +
            t[e[1]] +
            t[e[2]] +
            t[e[3]] +
            "-" +
            t[e[4]] +
            t[e[5]] +
            "-" +
            t[e[6]] +
            t[e[7]] +
            "-" +
            t[e[8]] +
            t[e[9]] +
            "-" +
            t[e[10]] +
            t[e[11]] +
            t[e[12]] +
            t[e[13]] +
            t[e[14]] +
            t[e[15]]
          ).toLowerCase()
        })(o)
      }
    }),
    "object" == typeof exports && "undefined" != typeof module
      ? (module.exports = e())
      : "function" == typeof define && define.amd
      ? define(e)
      : ((t = t || self).uuidv4 = e()),
    (function (e) {
      ;(e.lmSMTObj = e.lmSMTObj || []),
        (lmSMTObj.jsonData = {}),
        (lmSMTObj.cookieDomain = null),
        (lmSMTObj.domainList = []),
        (lmSMTObj.clickTrackers = null),
        (lmSMTObj.initialize = null),
        (lmSMTObj.finalize = null),
        (lmSMTObj.pixelFireStatus = !1),
        (lmSMTObj.onsiteEndpoint = "cdp.dev.hxcd.now.hclsoftware.cloud/"),
        (lmSMTObj.smartTagversion = "0.01v"),
        (lmSMTObj.libraryName = "javascript"),
        (lmSMTObj.callbackFunction = null),
        (lmSMTObj.writeKey = lmSMTObj.writeKey || null),
        (lmSMTObj.destinations = []),
        (lmSMTObj.vizNotifObject = !1),
        (lmSMTObj.resetFields = function () {
          ;(lmSMTObj.jsonData = {}), (lmSMTObj.pixelFireStatus = !1), (lmSMTObj.callbackFunction = null)
        }),
        (lmSMTObj.parse = function (e) {
          try {
            if ((e && (lmSMTObj.resetFields(), (lmSMTObj.argType = e)), !lmSMTObj.pixelFireStatus))
              try {
                lmSMTObj.fireAnalyze()
              } catch (e) {
                ;(lmSMTObj.jsonData.err = e), lmSMTObj.fireAnalyze()
              }
          } catch (e) {
            ;(lmSMTObj.jsonData.err = e), lmSMTObj.fireAnalyze()
          }
        }),
        (lmSMTObj.getUTMparams = function () {
          try {
            for (
              var e, t = new RegExp("(?:\\?|&)(utm_[^=]+)=(.*?)(?=&|$)", "gi"), n = {};
              null != (e = t.exec(document.URL));

            )
              n[e[1]] = e[2]
            return Object.keys(n).length > 0 ? n : void 0
          } catch (e) {}
        }),
        (lmSMTObj.getEventParams = function (e) {
          if ("object" == typeof e || null == e) {
            for (var t in (null == e && (e = {}), (lmSMTObj.jsonData.properties = {}), e))
              e.hasOwnProperty(t) && (lmSMTObj.jsonData.properties[t] = e[t])
            ;(lmSMTObj.jsonData.properties.path = e.path ? e.path : location.pathname),
              (e.referrer || document.referrer) &&
                (lmSMTObj.jsonData.properties.referrer = e.referrer ? e.referrer : document.referrer),
              (e.search || location.search) &&
                (lmSMTObj.jsonData.properties.search = e.search ? e.search : location.search),
              (lmSMTObj.jsonData.properties.title = e.title ? e.title : document.title),
              (lmSMTObj.jsonData.properties.url = e.url ? e.url : document.URL)
          } else
            (lmSMTObj.jsonData.context.page = {}),
              (lmSMTObj.jsonData.context.page.path = location.pathname),
              document.referrer && (lmSMTObj.jsonData.context.page.referrer = document.referrer),
              document.search && (lmSMTObj.jsonData.context.page.search = location.search),
              (lmSMTObj.jsonData.context.page.title = document.title),
              (lmSMTObj.jsonData.context.page.url = document.URL)
        }),
        (lmSMTObj.getAMCVCookie = function () {
          try {
            var e = /AMCV_([^;]+)/,
              t = document.cookie.match(e)
            if ((t = t ? t[1] : null) && null !== t) {
              var n = t.split("=")[1]
              ;(n = decodeURIComponent(n)), (e = /MCMID\|([^|]+)/)
              var i = n.match(e),
                a = i ? i[1] : null
              if (a && null !== a) return a
            }
          } catch (e) {
            return ""
          }
        }),
        (lmSMTObj.getCommonParams = function (e) {
          if (lmSMTObj.getCookie("userId")) var t = lmSMTObj.getCookie("userId")
          if (lmSMTObj.getCookie("_ga")) var n = lmSMTObj.getCookie("_ga")
          if (lmSMTObj.getCookie("_fbc")) var i = lmSMTObj.getCookie("_fbc")
          if (lmSMTObj.getCookie("_fbp")) var a = lmSMTObj.getCookie("_fbp")
          if (lmSMTObj.getAMCVCookie()) var o = lmSMTObj.getAMCVCookie()
          if (
            ((lmSMTObj.jsonData.id = lmSMTObj.vizidCookie("_vz", lmSMTObj.cookieDomain)),
            (lmSMTObj.jsonData.userId = t),
            (lmSMTObj.jsonData.originalTimestamp = new Date().getTime()),
            (lmSMTObj.jsonData.messageId = uuidv4()),
            (lmSMTObj.jsonData.writeKey = lmSMTObj.writeKey),
            (lmSMTObj.jsonData.otherIds = { _ga: n, _fbc: i, _fbp: a, mcmid: o }),
            "object" == typeof e)
          )
            for (var r in e) e.hasOwnProperty(r) && (lmSMTObj.jsonData.otherIds[r] = e[r])
          lmSMTObj.jsonData.context = {
            library: { name: lmSMTObj.libraryName, version: lmSMTObj.version },
            userAgent: {
              deviceType: lmSMTObj.getDevice(),
              osType: lmSMTObj.getOS(),
              osVersion: lmSMTObj.getOsVersion(),
              browser: lmSMTObj.checkBrowser(),
              ua: navigator.userAgent,
            },
            utm: lmSMTObj.getUTMparams(),
          }
        }),
        (lmSMTObj.init = function (e) {
          ;(lmSMTObj.destinations = []),
            (lmSMTObj.writeKey = e),
            lmSMTObj.initialize(),
            sourceDestinationsInstanceMapping &&
              sourceDestinationsInstanceMapping[e] &&
              sourceDestinationsInstanceMapping[e].forEach(e => {
                switch (e.CDPDestinationId) {
                  case 1:
                    lmSMTObj.destinations.push({
                      id: "fb",
                      class: new FacebookPixel(e.ConfigJson.pixelId),
                      destinationInstanceId: e.DestinationInstanceId,
                    })
                    break
                  case 2:
                    lmSMTObj.destinations.push({
                      id: "clevertap",
                      class: new Clevertap(e.ConfigJson.account_id),
                      destinationInstanceId: e.DestinationInstanceId,
                    })
                    break
                  case 5:
                    lmSMTObj.destinations.push({
                      id: "linkedin",
                      class: new LinkedInInsightTag(e.ConfigJson.linkedin),
                      destinationInstanceId: e.DestinationInstanceId,
                    })
                    break
                  case 6:
                    lmSMTObj.destinations.push({
                      id: "qp",
                      class: new QuoraPixel(e.ConfigJson.pixel_key),
                      destinationInstanceId: e.DestinationInstanceId,
                    })
                    break
                  case 8:
                    lmSMTObj.destinations.push({
                      id: "hotjar",
                      class: new Hotjar(e.ConfigJson.site_id),
                      destinationInstanceId: e.DestinationInstanceId,
                    })
                    break
                  case 10:
                    lmSMTObj.destinations.push({
                      id: "ga",
                      class: new GA(e.ConfigJson.tracking_id.Id),
                      destinationInstanceId: e.DestinationInstanceId,
                    })
                    break
                  case 12:
                    lmSMTObj.destinations.push({
                      id: "gAds",
                      class: new GoogleAds(e.ConfigJson.google_conversion_id),
                      destinationInstanceId: e.DestinationInstanceId,
                    })
                    break
                  case 18:
                    lmSMTObj.destinations.push({
                      id: "tiktok",
                      class: new Tiktok(e.ConfigJson.pixelId),
                      destinationInstanceId: e.DestinationInstanceId,
                    })
                    break
                  case 19:
                    lmSMTObj.destinations.push({
                      id: "ga4",
                      class: new GA4(e.ConfigJson.measurement_id),
                      destinationInstanceId: e.DestinationInstanceId,
                    })
                    break
                  case 20:
                    lmSMTObj.destinations.push({
                      id: "criteo",
                      class: new Criteo(e.ConfigJson.criteoOneTagId),
                      destinationInstanceId: e.DestinationInstanceId,
                    })
                    break
                  case 21:
                    lmSMTObj.destinations.push({
                      id: "taboola",
                      class: new Taboola(e.ConfigJson.pixelId),
                      destinationInstanceId: e.DestinationInstanceId,
                    })
                    break
                  case 22:
                    lmSMTObj.destinations.push({
                      id: "outbrain",
                      class: new Outbrain(e.ConfigJson.marketerId),
                      destinationInstanceId: e.DestinationInstanceId,
                    })
                }
              }),
            lmSMTObj.destinations.length && lmSMTObj.destinations.map(e => e.class.init())
        }),
        (lmSMTObj.route = function (e, t) {
          routeEventDestination(e, t, lmSMTObj, sourceDestinationsInstanceMapping, eventDestinationMapping, "v3")
        }),
        (lmSMTObj.identify = function (e, t, n, i) {
          try {
            if (
              (lmSMTObj.resetFields(),
              (lmSMTObj.jsonData.customerProperties = {}),
              (lmSMTObj.jsonData.type = "identify"),
              "function" == typeof n && ((i = n), (n = null)),
              "function" == typeof t && ((i = t), (n = t = null)),
              "function" == typeof e && ((i = e), (n = t = e = null)),
              "object" == typeof e && ((n = t), (t = e), (e = null)),
              e && ((lmSMTObj.jsonData.userId = e), lmSMTObj.setCookie("userId", e, 365, lmSMTObj.cookieDomain)),
              lmSMTObj.getCommonParams(n),
              lmSMTObj.getEventParams("identify"),
              "object" == typeof t)
            )
              for (var a in t) t.hasOwnProperty(a) && (lmSMTObj.jsonData.customerProperties[a] = t[a])
            if (i && "function" != typeof i) throw new TypeError("argument passed to callback is not valid type")
            lmSMTObj.parse(), lmSMTObj.route(null, "identify")
          } catch (e) {}
          i && setTimeout(i, 500)
        }),
        (lmSMTObj.track = function (e, t, n, i) {
          try {
            if (
              (lmSMTObj.resetFields(),
              (lmSMTObj.jsonData.properties = {}),
              (lmSMTObj.jsonData.type = "track"),
              !e || "string" != typeof e)
            )
              throw new TypeError("First argument has to be string")
            for (var a in ((lmSMTObj.jsonData.event = e),
            "function" == typeof n && ((i = n), (n = null)),
            "function" == typeof t && ((i = t), (n = null), (t = null)),
            lmSMTObj.getCommonParams(n),
            lmSMTObj.getEventParams("track"),
            t))
              t.hasOwnProperty(a) && (lmSMTObj.jsonData.properties[a] = t[a])
            lmSMTObj.parse(), lmSMTObj.route(e, "track")
          } catch (e) {}
          i && setTimeout(i, 500)
        }),
        (lmSMTObj.page = function (e, t, n, i) {
          try {
            lmSMTObj.resetFields(),
              "function" == typeof n && ((i = n), (n = null)),
              "function" == typeof t && ((i = t), (n = t = null)),
              "function" == typeof e && ((i = e), (n = t = e = null)),
              "object" == typeof e && ((n = t), (t = e), (e = null)),
              (lmSMTObj.jsonData.type = "page"),
              e && (lmSMTObj.jsonData.name = e),
              lmSMTObj.getCommonParams(n),
              lmSMTObj.getEventParams(t),
              lmSMTObj.parse(),
              lmSMTObj.route(e, "page")
          } catch (e) {}
          i && setTimeout(i, 500)
        }),
        (lmSMTObj.getDevice = function () {
          var e = navigator.userAgent
          return /ipad/i.test(e)
            ? "IPAD_TAB_MOBILE"
            : /android|Tablet/gi.test(e) && !/mobile/i.test(e)
            ? "TAB_MOBILE"
            : /mqqbrowser|tencenttraveler|baidubrowser|criOS|ucbrowser|mobile|CrMo/gi.test(e) ||
              (/opera|opr/gi.test(e) && /mobi|mini/gi.test(e))
            ? "MOBILE"
            : "DESKTOP"
        }),
        (lmSMTObj.getOS = function () {
          var t = e.navigator.userAgent,
            n = e.navigator.platform,
            i = null
          return (
            -1 !== ["Macintosh", "MacIntel", "MacPPC", "Mac68K"].indexOf(n)
              ? (i = "Mac OS")
              : -1 !== ["iPhone", "iPad", "iPod"].indexOf(n)
              ? (i = "iOS")
              : -1 !== ["Win32", "Win64", "Windows", "WinCE"].indexOf(n)
              ? (i = "Windows")
              : /Android/.test(t)
              ? (i = "Android")
              : !i && /Linux/.test(n) && (i = "Linux"),
            i
          )
        }),
        (lmSMTObj.getOsVersion = function () {
          try {
            var t,
              n = null
            return (
              -1 !== e.navigator.userAgent.indexOf("Windows NT 10.0") && (n = "Windows 10"),
              -1 !== e.navigator.userAgent.indexOf("Windows NT 6.2") && (n = "Windows 8"),
              -1 !== e.navigator.userAgent.indexOf("Windows NT 6.1") && (n = "Windows 7"),
              -1 !== e.navigator.userAgent.indexOf("Windows NT 6.0") && (n = "Windows Vista"),
              -1 !== e.navigator.userAgent.indexOf("Windows NT 5.1") && (n = "Windows XP"),
              -1 !== e.navigator.userAgent.indexOf("Windows NT 5.0") && (n = "Windows 2000"),
              -1 !== e.navigator.userAgent.indexOf("Mac") &&
                (n =
                  (t = /(iPhone OS|Mac OS X)\s+([\d\.]+)/).exec(e.navigator.userAgent)[0] ||
                  t.exec(navigator.appVersion)[0]),
              -1 !== e.navigator.userAgent.indexOf("X11") && (n = "UNIX"),
              -1 !== e.navigator.userAgent.indexOf("Linux") && (n = "Linux"),
              -1 !== e.navigator.userAgent.indexOf("Android") &&
                (n = (t = /Android\s+([\d\.]+)/).exec(e.navigator.appVersion)[1]),
              n
            )
          } catch (e) {}
        }),
        (lmSMTObj.checkBrowser = function () {
          let e
          var t,
            n,
            i,
            a = navigator.userAgent
          return (
            a.indexOf("Firefox") > -1
              ? (e = "Firefox")
              : a.indexOf("MSIE") > -1 || a.indexOf("rv:") > -1
              ? (e = "Internet Explorer")
              : a.indexOf("Edg") > -1
              ? (e = "Egde")
              : a.indexOf("OP") > -1
              ? ((e = "Opera"), (i = !0))
              : a.indexOf("Chrome") > -1
              ? ((n = !0), (e = "Chrome"))
              : a.indexOf("Safari") > -1 && ((e = "Safari"), (t = !0)),
            n && t && ((t = !1), (e = "chrome")),
            n && i && ((n = !1), (e = "Opera")),
            e
          )
        }),
        (lmSMTObj.getCookie = function (e) {
          var t = document.cookie
          if (!e) return ""
          var n = t.split(";")
          for (var i in n)
            if (n.hasOwnProperty(i)) {
              var a = n[i].match(/\s*(.*)=(.*)/)
              if (a && a[1] === e && a[2]) return a[2]
            }
          return ""
        }),
        (lmSMTObj.selectDomain = function () {
          const e = document && document.domain
          if (lmSMTObj.cookieDomain && lmSMTObj.cookieDomain === e) return 1
          const t = lmSMTObj.domainList
          for (let n = 1; n < t.length; n++) if (t[n] === e) return (lmSMTObj.cookieDomain = t[n]), 0
          return (lmSMTObj.cookieDomain = e), -1
        }),
        (lmSMTObj.fireAnalyze = function () {
          var t = "https://pl.dev.hxcd.now.hclsoftware.cloud/analyze/cookieCallback.php?cb=" + lmSMTObj.cookieDomain
          if (!lmSMTObj.pixelFireStatus) {
            var n = "https://pl.dev.hxcd.now.hclsoftware.cloud/analyze/analyze.php"
            if (e.XDomainRequest)
              (xhttp = new XDomainRequest()),
                (xhttp.onload = function () {
                  lmSMTObj.callBackViz(t)
                }),
                xhttp.open("POST", n, !0),
                (xhttp.withCredentials = !0),
                xhttp.send(JSON.stringify(lmSMTObj.jsonData))
            else if (e.XMLHttpRequest) {
              var i = new XMLHttpRequest()
              ;(i.onreadystatechange = function () {
                i.readyState === XMLHttpRequest.DONE && 200 === i.status && lmSMTObj.callBackViz(t)
              }),
                i.open("POST", n, !0),
                (i.withCredentials = !0),
                i.send(JSON.stringify(lmSMTObj.jsonData))
            }
          }
        }),
        (lmSMTObj.detectCampaign = function () {
          return "VIZVRM6543"
        }),
        (lmSMTObj.initialize = function () {
          ;(lmSMTObj.cookieDomain = "hclcdp-tango-6543.dev.hxcd.now.hclsoftware.cloud"),
            (lmSMTObj.domainList = "hclcdp-banking-6526.dev.hxcd.now.hclsoftware.cloud".split("|")),
            lmSMTObj.selectDomain && lmSMTObj.selectDomain(),
            (lmSMTObj.clickTrackers = "")
        }),
        (lmSMTObj.OnsiteNotificationTag = function () {
          if (lmSMTObj.vizNotifObject) {
            if (VizuryNotificationObject && "function" == typeof VizuryNotificationObject.createDivElementSinglePage) {
              var t = document.getElementById("vizury-notification-template")
              ;(e.location.href === lmSMTObj.oldUrl && t) || VizuryNotificationObject.createDivElementSinglePage(),
                (lmSMTObj.oldUrl = e.location.href)
            }
          } else
            try {
              var n = document.createElement("script")
              ;(n.type = "text/javascript"),
                (n.async = !0),
                (n.src = "https://djn9nab80eytt.cloudfront.net/testing/GetJsFileEventCapture.js"),
                document.body.appendChild(n),
                (n.onload = function () {
                  try {
                    VizuryNotificationObject.createDivElement(), (lmSMTObj.vizNotifObject = !0)
                  } catch (e) {}
                }),
                (n.onreadystatechange = function () {
                  if ("complete" == n.readyState || "loaded" == n.readyState)
                    try {
                      VizuryNotificationObject.createDivElement(), (lmSMTObj.vizNotifObject = !0)
                    } catch (e) {}
                })
            } catch (e) {}
        }),
        (lmSMTObj.callBackViz = function (e) {
          e = lmSMTObj.isSafari() ? e + "&sf=y" : e
          var t = document.getElementsByTagName("script")[0],
            n = document.createElement("script")
          ;(n.type = "text/javascript"),
            (n.src = e),
            (n.async = !0),
            t.parentNode.insertBefore(n, t),
            (n.onload = function () {
              try {
                lmSMTObj.OnsiteNotificationTag()
              } catch (e) {}
            }),
            (n.onreadystatechange = function () {
              if ("complete" == n.readyState || "loaded" == n.readyState)
                try {
                  lmSMTObj.OnsiteNotificationTag()
                } catch (e) {}
            })
        }),
        (lmSMTObj.vizidCookie = function (e, t) {
          var n = lmSMTObj.getCookie(e)
          return n || ((lmSMTObj.ftu = 1), (n = lmSMTObj.generateVizCookie()), lmSMTObj.setCookie(e, n, 365, t)), n
        }),
        (lmSMTObj.generateVizCookie = function () {
          for (
            var e = lmSMTObj.isSafari() ? "vizSF_" : "viz_",
              t = 7418186,
              n = parseInt(new Date().getTime() / 1e3, 10).toString(16),
              i = Math.floor(Math.random() * t).toString(16);
            i.length < 5;

          )
            i += Math.floor(Math.random() * t).toString(16)
          return e + n + (i = i.slice(i.length - 5))
        }),
        (lmSMTObj.isSafari = function () {
          return (
            Object.prototype.toString.call(e.HTMLElement).indexOf("Constructor") > 0 ||
            "[object SafariRemoteNotification]" === (!e.safari || safari.pushNotification).toString()
          )
        }),
        (lmSMTObj.setCookie = function (e, t, n, i) {
          var a = i ? "; domain=" + i : ""
          if (n > 0) {
            var o = new Date()
            o.setDate(o.getDate() + n)
            var r = encodeURIComponent(t) + (null == n ? "" : "; expires=" + o.toUTCString()) + "; path=/" + a
            document.cookie = e + "=" + r
          } else document.cookie = e + "=" + encodeURIComponent(t)
        }),
        (function () {
          for (; lmSMTObj.length > 0; ) {
            var t = Array.prototype.slice.call(lmSMTObj.shift())
            "callbackEnded" !== t[t.length - 1] && e.lmSMTObj[t[0]].apply(this, t.slice(1))
          }
        })(),
        "undefined" != typeof lmSMTObj && lmSMTObj && void 0 !== lmSMTObj.parse && (lmSMTObj.pixelFireStatus = !1)
    })(window)
})()
