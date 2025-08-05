module.exports = {
  ci: {
    collect: {
      url: ['http://localhost:3000'],
      startServerCommand: 'npm run dev',
      startServerReadyPattern: 'Development Server \\(http://localhost:3000\\) started',
      startServerReadyTimeout: 10000,
      numberOfRuns: 3,
      settings: {
        chromeFlags: '--no-sandbox --disable-dev-shm-usage',
        preset: 'desktop',
        throttling: {
          rttMs: 40,
          throughputKbps: 10240,
          cpuSlowdownMultiplier: 1,
          requestLatencyMs: 0,
          downloadThroughputKbps: 0,
          uploadThroughputKbps: 0
        },
        formFactor: 'desktop',
        screenEmulation: {
          mobile: false,
          width: 1350,
          height: 940,
          deviceScaleFactor: 1,
          disabled: false
        },
        emulatedUserAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    },
    assert: {
      assertions: {
        'categories:performance': ['warn', { minScore: 0.9 }],
        'categories:accessibility': ['error', { minScore: 0.95 }],
        'categories:best-practices': ['warn', { minScore: 0.9 }],
        'categories:seo': ['warn', { minScore: 0.9 }],
        'first-contentful-paint': ['warn', { maxNumericValue: 2000 }],
        'largest-contentful-paint': ['warn', { maxNumericValue: 2500 }],
        'cumulative-layout-shift': ['warn', { maxNumericValue: 0.1 }],
        'total-blocking-time': ['warn', { maxNumericValue: 300 }],
        'speed-index': ['warn', { maxNumericValue: 2000 }],
        'interactive': ['warn', { maxNumericValue: 3500 }],
        'max-potential-fid': ['warn', { maxNumericValue: 130 }],
        'uses-optimized-images': 'warn',
        'uses-webp-images': 'warn',
        'uses-text-compression': 'warn',
        'uses-long-cache-ttl': 'warn',
        'total-byte-weight': ['warn', { maxNumericValue: 500000 }],
        'dom-size': ['warn', { maxNumericValue: 1500 }],
        'critical-request-chains': 'warn',
        'user-timings': 'warn',
        'bootup-time': 'warn',
        'mainthread-work-breakdown': 'warn',
        'font-display': 'warn',
        'resource-summary': 'warn',
        'third-party-summary': 'warn',
        'largest-contentful-paint-element': 'warn',
        'layout-shift-elements': 'warn',
        'long-tasks': 'warn',
        'non-composited-animations': 'warn',
        'unsized-images': 'warn',
        'preload-lcp-image': 'warn',
        'full-page-screenshot': 'warn'
      }
    },
    upload: {
      target: 'temporary-public-storage',
      outputDir: './lighthouse-reports'
    }
  }
};
