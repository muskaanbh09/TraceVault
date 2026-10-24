export interface App {
  id: string;
  name: string;
  icon: string;
  trustScore: number;
  riskLevel: 'Safe' | 'Caution' | 'Avoid';
  permissions: string[];
  breaches: { date: string; description: string }[];
  privacyInsights: {
    dataSharing: string;
    thirdParty: string;
    userControl: string;
  };
}

export interface DataAccess {
  id: string;
  time: string;
  appName: string;
  dataAccessed: string[];
  status: 'Allowed' | 'Blocked' | 'Warning';
}

export interface Alert {
  id: string;
  title: string;
  description: string;
  time: string;
  severity: 'high' | 'medium' | 'low';
  appName: string;
}

export const apps: App[] = [
  {
    id: '1',
    name: 'Instagram',
    icon: '📷',
    trustScore: 4.5,
    riskLevel: 'Caution',
    permissions: ['Camera', 'Microphone', 'Location', 'Contacts', 'Storage', 'Photos'],
    breaches: [
      { date: 'March 2024', description: 'Data leak affecting 5M users' },
      { date: 'June 2023', description: 'Unauthorized API access' }
    ],
    privacyInsights: {
      dataSharing: 'Shares data with 127 third-party advertisers',
      thirdParty: 'Meta family of apps, advertising networks, analytics providers',
      userControl: 'Limited control over data deletion. Can download data archive.'
    }
  },
  {
    id: '2',
    name: 'WhatsApp',
    icon: '💬',
    trustScore: 7.2,
    riskLevel: 'Safe',
    permissions: ['Contacts', 'Camera', 'Microphone', 'Storage'],
    breaches: [],
    privacyInsights: {
      dataSharing: 'End-to-end encrypted. Shares metadata with Meta',
      thirdParty: 'Meta Platforms Inc. for infrastructure and analytics',
      userControl: 'Can delete account and request data deletion'
    }
  },
  {
    id: '3',
    name: 'TikTok',
    icon: '🎵',
    trustScore: 3.1,
    riskLevel: 'Avoid',
    permissions: ['Camera', 'Microphone', 'Location', 'Contacts', 'Storage', 'Phone', 'Calendar'],
    breaches: [
      { date: 'January 2024', description: 'Clipboard data collection without consent' }
    ],
    privacyInsights: {
      dataSharing: 'Extensive data collection and sharing with parent company',
      thirdParty: 'ByteDance, multiple advertising partners, unknown third parties',
      userControl: 'Minimal control. Data retention unclear.'
    }
  },
  {
    id: '4',
    name: 'Signal',
    icon: '🔒',
    trustScore: 9.5,
    riskLevel: 'Safe',
    permissions: ['Contacts', 'Camera', 'Microphone'],
    breaches: [],
    privacyInsights: {
      dataSharing: 'No data sharing. Open source and independently audited',
      thirdParty: 'None. Minimal metadata collection',
      userControl: 'Full control. Can delete account anytime. No data retention.'
    }
  },
  {
    id: '5',
    name: 'Facebook',
    icon: '👥',
    trustScore: 3.8,
    riskLevel: 'Avoid',
    permissions: ['Camera', 'Microphone', 'Location', 'Contacts', 'Storage', 'Calendar', 'Phone'],
    breaches: [
      { date: 'September 2023', description: 'Cambridge Analytica-style data misuse' },
      { date: 'April 2023', description: '533M user records leaked' }
    ],
    privacyInsights: {
      dataSharing: 'Extensive tracking across web and apps. Shares with 200+ partners',
      thirdParty: 'Meta platforms, advertisers, data brokers, political entities',
      userControl: 'Complex privacy settings. Limited real control.'
    }
  },
  {
    id: '6',
    name: 'Uber',
    icon: '🚗',
    trustScore: 6.2,
    riskLevel: 'Caution',
    permissions: ['Location', 'Phone', 'Camera', 'Contacts'],
    breaches: [
      { date: 'November 2023', description: 'Driver and rider data exposed' }
    ],
    privacyInsights: {
      dataSharing: 'Location tracking even when not in use. Shares with partners',
      thirdParty: 'Payment processors, mapping services, marketing partners',
      userControl: 'Can request data deletion within 30 days'
    }
  },
  {
    id: '7',
    name: 'Spotify',
    icon: '🎧',
    trustScore: 7.8,
    riskLevel: 'Safe',
    permissions: ['Storage', 'Microphone', 'Location'],
    breaches: [],
    privacyInsights: {
      dataSharing: 'Collects listening data for recommendations. Limited third-party sharing',
      thirdParty: 'Analytics providers, advertising partners (with consent)',
      userControl: 'Can download all data. Clear privacy controls.'
    }
  },
  {
    id: '8',
    name: 'Gmail',
    icon: '📧',
    trustScore: 6.8,
    riskLevel: 'Caution',
    permissions: ['Contacts', 'Storage', 'Camera'],
    breaches: [],
    privacyInsights: {
      dataSharing: 'Scans emails for ad targeting. Integrates with Google services',
      thirdParty: 'Google ecosystem, third-party apps with account access',
      userControl: 'Can export data. Integrated with Google Account controls.'
    }
  }
];

export const dataAccessLogs: DataAccess[] = [
  {
    id: '1',
    time: '2:34 PM',
    appName: 'Instagram',
    dataAccessed: ['Camera', 'Location'],
    status: 'Allowed'
  },
  {
    id: '2',
    time: '2:15 PM',
    appName: 'TikTok',
    dataAccessed: ['Microphone', 'Location', 'Contacts'],
    status: 'Warning'
  },
  {
    id: '3',
    time: '1:52 PM',
    appName: 'WhatsApp',
    dataAccessed: ['Camera'],
    status: 'Allowed'
  },
  {
    id: '4',
    time: '1:20 PM',
    appName: 'Facebook',
    dataAccessed: ['Location', 'Camera', 'Microphone'],
    status: 'Warning'
  },
  {
    id: '5',
    time: '12:45 PM',
    appName: 'Uber',
    dataAccessed: ['Location'],
    status: 'Allowed'
  },
  {
    id: '6',
    time: '11:30 AM',
    appName: 'Instagram',
    dataAccessed: ['Contacts', 'Storage'],
    status: 'Blocked'
  },
  {
    id: '7',
    time: '10:15 AM',
    appName: 'Spotify',
    dataAccessed: ['Storage'],
    status: 'Allowed'
  },
  {
    id: '8',
    time: '9:05 AM',
    appName: 'Gmail',
    dataAccessed: ['Contacts'],
    status: 'Allowed'
  },
  {
    id: '9',
    time: '8:42 AM',
    appName: 'TikTok',
    dataAccessed: ['Camera', 'Microphone'],
    status: 'Warning'
  }
];

export const alerts: Alert[] = [
  {
    id: '1',
    title: 'Camera accessed in background',
    description: 'Instagram accessed your camera while app was in background',
    time: '15 min ago',
    severity: 'high',
    appName: 'Instagram'
  },
  {
    id: '2',
    title: 'High-risk permission detected',
    description: 'TikTok requested access to your clipboard data',
    time: '1 hour ago',
    severity: 'high',
    appName: 'TikTok'
  },
  {
    id: '3',
    title: 'Unusual location tracking',
    description: 'Facebook accessed location 47 times in the last hour',
    time: '2 hours ago',
    severity: 'medium',
    appName: 'Facebook'
  },
  {
    id: '4',
    title: 'Third-party data sharing detected',
    description: 'Instagram shared data with 12 advertising partners',
    time: '3 hours ago',
    severity: 'medium',
    appName: 'Instagram'
  },
  {
    id: '5',
    title: 'Microphone accessed unexpectedly',
    description: 'TikTok accessed microphone without user interaction',
    time: '5 hours ago',
    severity: 'high',
    appName: 'TikTok'
  },
  {
    id: '6',
    title: 'Contact list accessed',
    description: 'Uber scanned your entire contact list',
    time: '6 hours ago',
    severity: 'low',
    appName: 'Uber'
  },
  {
    id: '7',
    title: 'Privacy policy updated',
    description: 'WhatsApp updated its privacy policy. Review recommended.',
    time: '1 day ago',
    severity: 'low',
    appName: 'WhatsApp'
  }
];
