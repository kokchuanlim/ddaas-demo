import { useState } from 'react'
import { 
  Shield, Globe, Zap, Clock, Play, ChevronRight, ChevronDown, ChevronUp,
  CheckCircle, Users, Database, FileText, BarChart3, Search, AlertTriangle,
  Cpu, Cloud, Network, Eye, TrendingUp, ArrowRight, XCircle, AlertCircle
} from 'lucide-react'

// ========== UI Components ==========
function Button({ children, onClick, variant = 'primary', className = '' }: any) {
  const base = 'px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2'
  const styles = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    secondary: 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50',
    outline: 'border border-slate-300 text-slate-700 hover:bg-slate-50'
  }
  return <button onClick={onClick} className={`${base} ${styles[variant as keyof typeof styles]} ${className}`}>{children}</button>
}

function Card({ children, className = '', onClick }: any) {
  return <div onClick={onClick} className={`bg-white rounded-xl border border-slate-200 shadow-sm ${className}`}>{children}</div>
}

function CardHeader({ children, className = '' }: any) {
  return <div className={`p-6 ${className}`}>{children}</div>
}

function CardContent({ children, className = '' }: any) {
  return <div className={`px-6 pb-6 ${className}`}>{children}</div>
}

function Badge({ children, className = '' }: any) {
  return <span className={`px-2 py-1 rounded-full text-xs font-medium ${className}`}>{children}</span>
}

function TabsList({ children }: any) {
  return <div className="flex gap-2 mb-6 bg-slate-100 p-1 rounded-lg w-fit">{children}</div>
}

function TabsTrigger({ children, active, onClick }: any) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
        active ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
      }`}
    >
      {children}
    </button>
  )
}

function Progress({ value }: any) {
  return (
    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
      <div className="h-full bg-blue-500 rounded-full transition-all" style={{ width: `${value}%` }} />
    </div>
  )
}

function Separator() {
  return <div className="h-px bg-slate-200 my-4" />
}

// ========== ENHANCED Feature 1: Interactive Pricing Tiers ==========
function PricingTierCard({ tier, isExpanded, onToggle }: any) {
  return (
    <Card 
      className={`cursor-pointer transition-all ${isExpanded ? 'border-blue-400 ring-2 ring-blue-100' : 'hover:border-slate-300'}`}
      onClick={onToggle}
    >
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
              tier.popular ? 'bg-blue-100' : 'bg-slate-100'
            }`}>
              <tier.icon className={`w-6 h-6 ${tier.popular ? 'text-blue-600' : 'text-slate-600'}`} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold text-slate-900">{tier.name}</h3>
                {tier.popular && (
                  <Badge className="bg-blue-600 text-white text-xs">POPULAR</Badge>
                )}
              </div>
              <p className="text-sm text-slate-500">{tier.turnaround} • {tier.target}</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-slate-900">{tier.price}</div>
            <div className="text-xs text-green-600 font-medium">{tier.discount}</div>
          </div>
          <div className="ml-4">
            {isExpanded ? (
              <ChevronUp className="w-5 h-5 text-blue-600" />
            ) : (
              <ChevronDown className="w-5 h-5 text-slate-400" />
            )}
          </div>
        </div>
      </CardHeader>

      {isExpanded && (
        <CardContent>
          <Separator />
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                Included Services
              </h4>
              <ul className="space-y-2">
                {tier.services.map((service: string, idx: number) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-slate-600">
                    <span className="text-green-500 mt-0.5">✓</span>
                    {service}
                  </li>
                ))}
              </ul>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-100">
              <div>
                <span className="text-xs text-slate-500">Turnaround</span>
                <p className="font-medium text-slate-900">{tier.turnaround}</p>
              </div>
              <div>
                <span className="text-xs text-slate-500">Target</span>
                <p className="font-medium text-slate-900">{tier.target}</p>
              </div>
            </div>

            <Button variant="primary" className="w-full justify-center mt-4">
              Get Started with {tier.name}
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      )}
    </Card>
  )
}

function FeatureConfirmation() {
  const [expandedTier, setExpandedTier] = useState<string | null>('Professional')

  const tiers = [
    {
      id: 'essential',
      name: 'Essential',
      price: '$300-500',
      turnaround: '48-72 hours',
      discount: 'Year 1: $180-300 (40% off)',
      target: 'Seed-stage investments',
      icon: FileText,
      services: [
        'AI-automated screening and data collection',
        'Identity & credential verification',
        'Litigation & media screening',
        'Basic financial health check',
        'Automated red flag detection'
      ]
    },
    {
      id: 'professional',
      name: 'Professional',
      price: '$800-1,500',
      turnaround: '5-7 business days',
      discount: 'Year 1: $560-1,050 (40% off)',
      target: 'Series A investments',
      icon: Users,
      popular: true,
      services: [
        'Founder behavioral interview (60 min)',
        'Reference verification (3+ contacts)',
        'Basic operational assessment',
        'Financial health analysis',
        'Management team background check',
        'Customer validation calls (2-3)',
        'Network mapping & reputation check'
      ]
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: '$2,500-5,000',
      turnaround: '10-15 business days',
      discount: 'Year 1: $1,750-3,500 (40% off)',
      target: 'Series B+ transactions',
      icon: Shield,
      services: [
        'Extended site presence (2-3 days)',
        'In-depth network mapping & reputation',
        'Forensic document analysis',
        'Comprehensive management assessment',
        'Supply chain verification',
        'Competitive landscape analysis',
        'Regulatory compliance deep-dive',
        'Exit scenario evaluation'
      ]
    }
  ]

  return (
    <div className="space-y-8">
      <div className="text-center">
        <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-4">Feature Overview</span>
        <h2 className="text-3xl font-bold text-slate-900 mb-4">4 Core Demo Features</h2>
        <p className="text-slate-600 max-w-2xl mx-auto">
          Based on the DDaaS Feasibility Analysis, these four features form the foundation of the demo platform.
        </p>
        <p className="text-sm text-slate-500 mt-2">Click on any pricing tier to see detailed services</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Feature 1: Service Tiers */}
        <div className="lg:col-span-2 space-y-4">
          <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
            <CardHeader>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <FileText className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <Badge className="bg-blue-600 text-white mb-2">Feature 1</Badge>
                  <h3 className="text-xl font-bold text-slate-900">Three-Tier Service Model</h3>
                  <p className="text-sm text-slate-600">Click any tier below to expand and see all included services</p>
                </div>
              </div>
            </CardHeader>
          </Card>

          {tiers.map((tier) => (
            <PricingTierCard
              key={tier.id}
              tier={tier}
              isExpanded={expandedTier === tier.id}
              onToggle={() => setExpandedTier(expandedTier === tier.id ? null : tier.id)}
            />
          ))}
        </div>

        {/* Feature 2: AI-Human Workflow */}
        <Card>
          <CardHeader>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
                <Zap className="w-6 h-6 text-amber-600" />
              </div>
              <div>
                <Badge className="bg-slate-100 text-slate-700 mb-2">Feature 2</Badge>
                <h3 className="text-xl font-bold text-slate-900">Hybrid AI-Human Workflow</h3>
                <p className="text-sm text-slate-600">40-60% cost reduction + human expertise</p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-2 mb-4">
              <div className="text-center p-2 bg-slate-50 rounded-lg">
                <div className="text-lg font-bold text-amber-600">40-60%</div>
                <div className="text-xs text-slate-500">Cost Reduction</div>
              </div>
              <div className="text-center p-2 bg-slate-50 rounded-lg">
                <div className="text-lg font-bold text-amber-600">70%</div>
                <div className="text-xs text-slate-500">AI Processing</div>
              </div>
              <div className="text-center p-2 bg-slate-50 rounded-lg">
                <div className="text-lg font-bold text-amber-600">30%</div>
                <div className="text-xs text-slate-500">Human Review</div>
              </div>
            </div>
            <div className="space-y-2">
              {[
                { step: 1, title: 'AI Data Collection', time: '2-4 hours' },
                { step: 2, title: 'AI Analysis', time: '1-2 hours' },
                { step: 3, title: 'Human Verification', time: '2-5 days' },
                { step: 4, title: 'Quality Review', time: '1-2 days' }
              ].map((s) => (
                <div key={s.step} className="flex items-center gap-3 p-2 bg-slate-50 rounded-lg">
                  <div className="w-6 h-6 rounded-full bg-amber-500 text-white text-xs flex items-center justify-center">{s.step}</div>
                  <span className="text-sm text-slate-700 flex-1">{s.title}</span>
                  <span className="text-xs text-slate-500">{s.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Feature 3: Multi-Market */}
        <Card>
          <CardHeader>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <Globe className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <Badge className="bg-slate-100 text-slate-700 mb-2">Feature 3</Badge>
                <h3 className="text-xl font-bold text-slate-900">Multi-Market Coverage</h3>
                <p className="text-sm text-slate-600">4 Southeast Asian markets</p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {[
                { country: 'Vietnam', phase: 'Phase 1', deals: '141 deals', funding: '$2.3B' },
                { country: 'Philippines', phase: 'Phase 2', deals: '80-100 deals', funding: '$1B+' },
                { country: 'Indonesia', phase: 'Phase 3', deals: 'Largest market', funding: 'Post-eFishery' },
                { country: 'Malaysia', phase: 'Phase 3', deals: 'RM 17.58B', funding: 'PE/VC hub' }
              ].map((m) => (
                <div key={m.country} className="p-3 rounded-lg border border-slate-200">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold text-slate-900">{m.country}</span>
                    <Badge className="bg-slate-100 text-slate-600 text-xs">{m.phase}</Badge>
                  </div>
                  <div className="text-xs text-slate-500">{m.deals} • {m.funding}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

// ========== Flow Diagram ==========
function FlowDiagram() {
  const flowSteps = [
    { id: 'intake', title: 'Client Intake', icon: Users, color: 'blue', desc: 'Service tier selection', time: '1-2 hours' },
    { id: 'collection', title: 'AI Data Collection', icon: Database, color: 'amber', desc: 'Automated data gathering', time: '2-4 hours' },
    { id: 'analysis', title: 'AI Analysis', icon: Cpu, color: 'amber', desc: 'Risk scoring & patterns', time: '1-2 hours' },
    { id: 'verification', title: 'Human Verification', icon: Search, color: 'green', desc: 'Boots-on-ground checks', time: '2-5 days' },
    { id: 'review', title: 'Quality Review', icon: CheckCircle, color: 'green', desc: 'Senior analyst validation', time: '1 day' },
    { id: 'delivery', title: 'Report Delivery', icon: FileText, color: 'blue', desc: 'Final DD report', time: 'Same day' }
  ]

  return (
    <div className="space-y-8">
      <div className="text-center">
        <span className="inline-block px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium mb-4">Process Flow</span>
        <h2 className="text-3xl font-bold text-slate-900 mb-4">Demo Feature Flow Diagram</h2>
        <p className="text-slate-600 max-w-2xl mx-auto">Complete end-to-end workflow from client intake to report delivery.</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        {flowSteps.map((step, idx) => (
          <Card key={step.id} className="relative">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  step.color === 'blue' ? 'bg-blue-100' : step.color === 'amber' ? 'bg-amber-100' : 'bg-green-100'
                }`}>
                  <step.icon className={`w-5 h-5 ${
                    step.color === 'blue' ? 'text-blue-600' : step.color === 'amber' ? 'text-amber-600' : 'text-green-600'
                  }`} />
                </div>
                <div>
                  <div className="text-xs text-slate-500">Step {idx + 1}</div>
                  <div className="font-semibold text-slate-900">{step.title}</div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-600 mb-2">{step.desc}</p>
              <Badge className="bg-slate-100 text-slate-600 text-xs">{step.time}</Badge>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Visual Flow */}
      <Card className="bg-slate-50">
        <CardHeader>
          <h3 className="font-semibold text-slate-900">Visual Process Flow</h3>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {flowSteps.map((step, idx) => (
              <div key={step.id} className="flex items-center">
                <div className="flex flex-col items-center p-3 bg-white rounded-lg border-2 border-slate-200">
                  <step.icon className="w-5 h-5 mb-1 text-slate-600" />
                  <span className="text-xs font-medium text-slate-700">{step.title}</span>
                </div>
                {idx < flowSteps.length - 1 && <ChevronRight className="w-5 h-5 text-slate-400 mx-1" />}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// ========== System Architecture ==========
function SystemArchitecture() {
  const [expanded, setExpanded] = useState<string | null>('application')

  const layers = [
    {
      id: 'presentation', name: 'Presentation Layer', icon: Eye, color: 'blue',
      components: [
        { name: 'Web Dashboard', tech: 'React + TypeScript' },
        { name: 'Mobile App', tech: 'React Native' },
        { name: 'API Gateway', tech: 'Kong/AWS' },
        { name: 'Admin Panel', tech: 'React + shadcn/ui' }
      ]
    },
    {
      id: 'application', name: 'Application Layer', icon: Cpu, color: 'amber',
      components: [
        { name: 'Orchestration Service', tech: 'Node.js / Python' },
        { name: 'AI/ML Engine', tech: 'Python + TensorFlow' },
        { name: 'Report Generator', tech: 'Node.js + Puppeteer' },
        { name: 'Document Parser', tech: 'Python + Tesseract' }
      ]
    },
    {
      id: 'data', name: 'Data Layer', icon: Database, color: 'green',
      components: [
        { name: 'Primary Database', tech: 'PostgreSQL' },
        { name: 'Document Store', tech: 'MongoDB' },
        { name: 'Cache Layer', tech: 'Redis' },
        { name: 'Search Engine', tech: 'Elasticsearch' }
      ]
    },
    {
      id: 'integration', name: 'Integration Layer', icon: Network, color: 'purple',
      components: [
        { name: 'Registry Connectors', tech: 'REST APIs' },
        { name: 'Credit Bureau APIs', tech: 'SOAP/REST' },
        { name: 'News Aggregator', tech: 'Python + Scrapy' },
        { name: 'Webhook Handler', tech: 'Node.js' }
      ]
    },
    {
      id: 'infrastructure', name: 'Infrastructure Layer', icon: Cloud, color: 'slate',
      components: [
        { name: 'Container Orchestration', tech: 'Kubernetes (EKS)' },
        { name: 'CDN', tech: 'CloudFront' },
        { name: 'Load Balancer', tech: 'ALB/NLB' },
        { name: 'Monitoring', tech: 'Prometheus + Grafana' }
      ]
    }
  ]

  return (
    <div className="space-y-8">
      <div className="text-center">
        <span className="inline-block px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium mb-4">System Design</span>
        <h2 className="text-3xl font-bold text-slate-900 mb-4">Demo System Architecture</h2>
        <p className="text-slate-600 max-w-2xl mx-auto">5-layer microservices architecture designed for extensibility.</p>
      </div>

      <div className="space-y-4">
        {layers.map((layer) => (
          <Card key={layer.id} className="cursor-pointer" onClick={() => setExpanded(expanded === layer.id ? null : layer.id)}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center bg-${layer.color}-100`}>
                    <layer.icon className={`w-5 h-5 text-${layer.color}-600`} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900">{layer.name}</h3>
                    <p className="text-sm text-slate-500">{layer.components.length} components</p>
                  </div>
                </div>
                <span className="text-slate-400">{expanded === layer.id ? '−' : '+'}</span>
              </div>
            </CardHeader>
            {expanded === layer.id && (
              <CardContent>
                <div className="grid md:grid-cols-2 gap-3">
                  {layer.components.map((comp) => (
                    <div key={comp.name} className="p-3 bg-slate-50 rounded-lg">
                      <div className="font-medium text-slate-900">{comp.name}</div>
                      <div className="text-xs text-slate-500">{comp.tech}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            )}
          </Card>
        ))}
      </div>

      {/* Extensibility Info */}
      <Card className="bg-gradient-to-r from-indigo-600 to-purple-700 text-white border-0">
        <CardHeader>
          <h3 className="text-xl font-bold">Making Your Demo More Realistic</h3>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <h4 className="font-semibold mb-2 flex items-center gap-2"><Database className="w-4 h-4" /> Add More Data</h4>
              <ul className="space-y-1 text-indigo-100">
                <li>• Seed with real company profiles</li>
                <li>• Add historical DD reports</li>
                <li>• Import registry data</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2 flex items-center gap-2"><Globe className="w-4 h-4" /> Expand Markets</h4>
              <ul className="space-y-1 text-indigo-100">
                <li>• Add Singapore, Thailand</li>
                <li>• Multi-language support</li>
                <li>• Market-specific templates</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// ========== ENHANCED Feature 4: Interactive Risk Categories with Tabs ==========
function RiskAssessment() {
  const [activeCategory, setActiveCategory] = useState('financial')

  const riskCategories = {
    financial: {
      name: 'Financial Risk',
      weight: '25%',
      color: 'blue',
      description: 'Assessment of financial health, revenue validation, and fiscal stability',
      indicators: [
        'Revenue verification & validation',
        'Cash flow analysis',
        'Debt & liability assessment',
        'Financial statement review',
        'Burn rate evaluation'
      ],
      sampleFinding: {
        severity: 'high',
        title: 'Revenue Concentration Risk',
        description: '65% of revenue from single customer creates significant dependency',
        score: 7.2,
        impact: 'High customer churn risk if contract is lost'
      }
    },
    operational: {
      name: 'Operational Risk',
      weight: '25%',
      color: 'amber',
      description: 'Evaluation of business operations, supply chain, and execution capability',
      indicators: [
        'Site verification & operational audit',
        'Customer validation calls',
        'Supplier relationship assessment',
        'Process documentation review',
        'Key personnel dependency'
      ],
      sampleFinding: {
        severity: 'medium',
        title: 'Limited Operational History',
        description: 'Company operating for only 18 months with limited track record',
        score: 5.4,
        impact: 'Unproven scalability and operational resilience'
      }
    },
    legal: {
      name: 'Legal/Compliance',
      weight: '20%',
      color: 'purple',
      description: 'Review of legal standing, regulatory compliance, and IP protection',
      indicators: [
        'Litigation & dispute check',
        'Regulatory compliance verification',
        'IP ownership & protection',
        'Contract review',
        'Corporate governance assessment'
      ],
      sampleFinding: {
        severity: 'low',
        title: 'Standard IP Assignments',
        description: 'All IP properly assigned to company with clean ownership chain',
        score: 2.1,
        impact: 'No legal risks identified in IP portfolio'
      }
    },
    founder: {
      name: 'Founder/Team',
      weight: '20%',
      color: 'red',
      description: 'Background check on founders, management team assessment, and references',
      indicators: [
        'Founder background verification',
        'Reference interviews (3+)',
        'Track record analysis',
        'Management team assessment',
        'Character & reputation check'
      ],
      sampleFinding: {
        severity: 'high',
        title: 'Prior Business Failure',
        description: 'Founder previously led company that filed for bankruptcy in 2019',
        score: 8.5,
        impact: 'Potential governance and decision-making concerns'
      }
    },
    market: {
      name: 'Market Risk',
      weight: '10%',
      color: 'green',
      description: 'Analysis of market size, competitive position, and growth trajectory',
      indicators: [
        'Market size validation (TAM/SAM/SOM)',
        'Competitive positioning',
        'Growth trajectory analysis',
        'Industry trend assessment',
        'Customer acquisition metrics'
      ],
      sampleFinding: {
        severity: 'medium',
        title: 'Competitive Market Entry',
        description: 'Entering saturated market with 15+ established competitors',
        score: 5.8,
        impact: 'Differentiation and customer acquisition challenges expected'
      }
    }
  }

  const currentCategory = riskCategories[activeCategory as keyof typeof riskCategories]

  const getSeverityColor = (severity: string) => {
    const colors = {
      low: { bg: 'bg-green-100', border: 'border-green-300', text: 'text-green-800', badge: 'bg-green-500' },
      medium: { bg: 'bg-amber-100', border: 'border-amber-300', text: 'text-amber-800', badge: 'bg-amber-500' },
      high: { bg: 'bg-red-100', border: 'border-red-300', text: 'text-red-800', badge: 'bg-red-500' }
    }
    return colors[severity as keyof typeof colors] || colors.medium
  }

  const colors = getSeverityColor(currentCategory.sampleFinding.severity)

  return (
    <div className="space-y-8">
      <div className="text-center">
        <span className="inline-block px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-medium mb-4">Feature 4 Enhanced</span>
        <h2 className="text-3xl font-bold text-slate-900 mb-4">Interactive Risk Assessment</h2>
        <p className="text-slate-600 max-w-2xl mx-auto">
          5-category risk scoring system with detailed indicators and sample findings.
        </p>
        <p className="text-sm text-slate-500 mt-2">Click on each category tab to explore</p>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2 bg-slate-100 p-2 rounded-xl">
        {Object.entries(riskCategories).map(([key, category]) => (
          <button
            key={key}
            onClick={() => setActiveCategory(key)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeCategory === key
                ? 'bg-white text-slate-900 shadow-sm ring-2 ring-blue-500'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200'
            }`}
          >
            {category.name}
            <span className="ml-2 text-xs opacity-70">{category.weight}</span>
          </button>
        ))}
      </div>

      {/* Category Details */}
      <Card className="border-t-4 border-t-blue-500">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-2xl font-bold text-slate-900">{currentCategory.name} Assessment</h3>
              <p className="text-slate-600 mt-1">{currentCategory.description}</p>
            </div>
            <Badge className="bg-blue-100 text-blue-700 text-sm px-3 py-1">
              Weight: {currentCategory.weight}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Risk Indicators */}
            <div>
              <h4 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-blue-500" />
                Risk Indicators
              </h4>
              <ul className="space-y-2">
                {currentCategory.indicators.map((indicator, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-slate-600 p-2 bg-slate-50 rounded-lg">
                    <span className="text-blue-500 mt-0.5">•</span>
                    {indicator}
                  </li>
                ))}
              </ul>
            </div>

            {/* Sample Finding */}
            <div>
              <h4 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-amber-500" />
                Sample Finding
              </h4>
              <div className={`p-4 rounded-xl border-2 ${colors.bg} ${colors.border}`}>
                <div className="flex items-center gap-2 mb-2">
                  <span className={`w-3 h-3 rounded-full ${colors.badge}`}></span>
                  <span className={`text-xs font-bold uppercase ${colors.text}`}>
                    {currentCategory.sampleFinding.severity} Risk
                  </span>
                </div>
                <h5 className={`font-bold text-lg mb-1 ${colors.text}`}>
                  {currentCategory.sampleFinding.title}
                </h5>
                <p className={`text-sm mb-3 ${colors.text}`}>
                  {currentCategory.sampleFinding.description}
                </p>
                <div className="flex items-center justify-between pt-3 border-t border-current border-opacity-20">
                  <div>
                    <span className={`text-xs ${colors.text} opacity-70`}>Risk Score</span>
                    <p className={`font-bold text-xl ${colors.text}`}>
                      {currentCategory.sampleFinding.score}/10
                    </p>
                  </div>
                  <div className="text-right">
                    <span className={`text-xs ${colors.text} opacity-70`}>Impact</span>
                    <p className={`text-sm ${colors.text}`}>
                      {currentCategory.sampleFinding.impact}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Risk Score Summary */}
      <Card className="bg-slate-50">
        <CardHeader>
          <h3 className="font-semibold text-slate-900">Overall Risk Score Breakdown</h3>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {Object.entries(riskCategories).map(([key, category]) => {
              const score = category.sampleFinding.score
              const isActive = activeCategory === key
              return (
                <div 
                  key={key} 
                  onClick={() => setActiveCategory(key)}
                  className={`flex items-center gap-4 p-3 rounded-lg cursor-pointer transition-all ${
                    isActive ? 'bg-white shadow-sm ring-2 ring-blue-200' : 'hover:bg-white'
                  }`}
                >
                  <div className="w-24 text-sm font-medium text-slate-700">{category.name}</div>
                  <div className="flex-1">
                    <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full transition-all ${
                          score <= 3 ? 'bg-green-500' : score <= 6 ? 'bg-amber-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${(score / 10) * 100}%` }}
                      />
                    </div>
                  </div>
                  <div className="w-16 text-right">
                    <span className={`font-bold ${
                      score <= 3 ? 'text-green-600' : score <= 6 ? 'text-amber-600' : 'text-red-600'
                    }`}>
                      {score}
                    </span>
                    <span className="text-xs text-slate-400 ml-1">{category.weight}</span>
                  </div>
                </div>
              )
            })}
          </div>
          <div className="mt-4 pt-4 border-t border-slate-200 flex items-center justify-between">
            <span className="text-sm text-slate-600">Overall Weighted Score</span>
            <span className="text-2xl font-bold text-amber-600">5.8/10</span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// ========== Demo Dashboard ==========
function DemoDashboard() {
  const [activeTab, setActiveTab] = useState('overview')

  const engagements = [
    { id: 'DD-2026-001', company: 'GreenHarvest Agritech', country: 'Vietnam', tier: 'Professional', status: 'in_progress', progress: 65, risk: 4.2 },
    { id: 'DD-2026-002', company: 'PayFast Fintech', country: 'Philippines', tier: 'Enterprise', status: 'completed', progress: 100, risk: 3.1 },
    { id: 'DD-2026-003', company: 'EcoEnergy Solutions', country: 'Indonesia', tier: 'Essential', status: 'pending', progress: 0, risk: null },
    { id: 'DD-2026-004', company: 'HealthPlus Digital', country: 'Malaysia', tier: 'Professional', status: 'in_progress', progress: 35, risk: 5.8 }
  ]

  const getStatusColor = (status: string) => ({
    completed: 'bg-green-100 text-green-700',
    in_progress: 'bg-blue-100 text-blue-700',
    pending: 'bg-slate-100 text-slate-700'
  }[status] || 'bg-slate-100 text-slate-700')

  const getRiskColor = (risk: number | null) => {
    if (risk === null) return 'text-slate-400'
    if (risk <= 3) return 'text-green-600 bg-green-100'
    if (risk <= 6) return 'text-amber-600 bg-amber-100'
    return 'text-red-600 bg-red-100'
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <span className="inline-block px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium mb-4">Live Demo</span>
        <h2 className="text-3xl font-bold text-slate-900 mb-4">DDaaS Platform Dashboard</h2>
        <p className="text-slate-600 max-w-2xl mx-auto">Interactive dashboard with engagement tracking and risk assessment.</p>
      </div>

      <TabsList>
        <TabsTrigger active={activeTab === 'overview'} onClick={() => setActiveTab('overview')}>Overview</TabsTrigger>
        <TabsTrigger active={activeTab === 'engagements'} onClick={() => setActiveTab('engagements')}>Engagements</TabsTrigger>
        <TabsTrigger active={activeTab === 'markets'} onClick={() => setActiveTab('markets')}>Markets</TabsTrigger>
      </TabsList>

      {activeTab === 'overview' && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card><CardContent className="p-4"><div className="text-2xl font-bold text-blue-600">41</div><div className="text-sm text-slate-500">Active Engagements</div></CardContent></Card>
          <Card><CardContent className="p-4"><div className="text-2xl font-bold text-amber-600">4.2</div><div className="text-sm text-slate-500">Avg Risk Score</div></CardContent></Card>
          <Card><CardContent className="p-4"><div className="text-2xl font-bold text-green-600">18</div><div className="text-sm text-slate-500">Active Analysts</div></CardContent></Card>
          <Card><CardContent className="p-4"><div className="text-2xl font-bold text-purple-600">94%</div><div className="text-sm text-slate-500">Completion Rate</div></CardContent></Card>
        </div>
      )}

      {activeTab === 'engagements' && (
        <Card>
          <CardContent className="p-0">
            <table className="w-full">
              <thead className="bg-slate-50"><tr>
                <th className="text-left p-4 text-sm font-medium text-slate-700">ID</th>
                <th className="text-left p-4 text-sm font-medium text-slate-700">Company</th>
                <th className="text-left p-4 text-sm font-medium text-slate-700">Country</th>
                <th className="text-left p-4 text-sm font-medium text-slate-700">Status</th>
                <th className="text-left p-4 text-sm font-medium text-slate-700">Progress</th>
                <th className="text-left p-4 text-sm font-medium text-slate-700">Risk</th>
              </tr></thead>
              <tbody>
                {engagements.map((eng) => (
                  <tr key={eng.id} className="border-b">
                    <td className="p-4 text-sm text-slate-600">{eng.id}</td>
                    <td className="p-4 font-medium text-slate-900">{eng.company}</td>
                    <td className="p-4 text-sm text-slate-600">{eng.country}</td>
                    <td className="p-4"><Badge className={`${getStatusColor(eng.status)} text-xs`}>{eng.status.replace('_', ' ')}</Badge></td>
                    <td className="p-4"><Progress value={eng.progress} /></td>
                    <td className="p-4">{eng.risk ? <span className={`px-2 py-1 rounded text-xs font-medium ${getRiskColor(eng.risk)}`}>{eng.risk}</span> : <span className="text-xs text-slate-400">-</span>}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      )}

      {activeTab === 'markets' && (
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { country: 'Vietnam', deals: 141, funding: '$2.3B', active: 12 },
            { country: 'Philippines', deals: 85, funding: '$1.1B', active: 8 },
            { country: 'Indonesia', deals: 156, funding: '$3.2B', active: 15 },
            { country: 'Malaysia', deals: 67, funding: '$890M', active: 6 }
          ].map((m) => (
            <Card key={m.country}>
              <CardHeader>
                <h3 className="font-semibold text-slate-900">{m.country}</h3>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div><div className="text-xl font-bold">{m.deals}</div><div className="text-xs text-slate-500">Deals</div></div>
                  <div><div className="text-xl font-bold">{m.active}</div><div className="text-xs text-slate-500">Active</div></div>
                </div>
                <div className="text-center mt-3 text-sm text-slate-600">{m.funding}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

// ========== Main App ==========
function App() {
  const [activeTab, setActiveTab] = useState('features')

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-900">DDaaS Platform</h1>
                <p className="text-xs text-slate-500">Due Diligence-as-a-Service Demo v2</p>
              </div>
            </div>
            <nav className="hidden md:flex items-center gap-6">
              <a href="#features" className="text-sm font-medium text-slate-600 hover:text-blue-600">Features</a>
              <a href="#flow" className="text-sm font-medium text-slate-600 hover:text-blue-600">Flow Diagram</a>
              <a href="#architecture" className="text-sm font-medium text-slate-600 hover:text-blue-600">Architecture</a>
              <a href="#demo" className="text-sm font-medium text-slate-600 hover:text-blue-600">Live Demo</a>
            </nav>
            <Button variant="primary" className="bg-blue-600 text-white">
              <Play className="w-4 h-4" /> Start Demo
            </Button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative bg-gradient-to-br from-blue-900 via-indigo-900 to-slate-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block px-3 py-1 bg-blue-500/20 text-blue-200 rounded-full text-sm mb-4">Southeast Asia Market</span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Due Diligence <span className="text-blue-400">Reimagined</span></h2>
          <p className="text-lg text-slate-300 mb-8 max-w-2xl mx-auto">Hybrid AI-human due diligence platform for VC investors across Vietnam, Philippines, Indonesia, and Malaysia.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full"><Zap className="w-4 h-4 text-yellow-400" /><span className="text-sm">40-60% Cost Reduction</span></div>
            <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full"><Clock className="w-4 h-4 text-green-400" /><span className="text-sm">2-3 Week Turnaround</span></div>
            <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full"><Globe className="w-4 h-4 text-blue-400" /><span className="text-sm">4 Markets</span></div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <TabsList className="mb-8">
          <TabsTrigger active={activeTab === 'features'} onClick={() => setActiveTab('features')}>1. Features</TabsTrigger>
          <TabsTrigger active={activeTab === 'flow'} onClick={() => setActiveTab('flow')}>2. Flow Diagram</TabsTrigger>
          <TabsTrigger active={activeTab === 'architecture'} onClick={() => setActiveTab('architecture')}>3. Architecture</TabsTrigger>
          <TabsTrigger active={activeTab === 'demo'} onClick={() => setActiveTab('demo')}>4. Live Demo</TabsTrigger>
        </TabsList>

        {activeTab === 'features' && <FeatureConfirmation />}
        {activeTab === 'flow' && <FlowDiagram />}
        {activeTab === 'architecture' && <SystemArchitecture />}
        {activeTab === 'demo' && <DemoDashboard />}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Shield className="w-6 h-6 text-blue-500" />
                <span className="text-white font-bold">DDaaS Platform</span>
              </div>
              <p className="text-sm">Hybrid AI-human due diligence for Southeast Asian markets.</p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Markets</h4>
              <ul className="space-y-2 text-sm"><li>Vietnam</li><li>Philippines</li><li>Indonesia</li><li>Malaysia</li></ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-sm"><li>Essential DD</li><li>Professional DD</li><li>Enterprise DD</li></ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Contact</h4>
              <p className="text-sm">demo@ddaas-platform.com</p>
            </div>
          </div>
          <Separator />
          <p className="text-center text-sm mt-8">© 2026 DDaaS Platform Demo v2</p>
        </div>
      </footer>
    </div>
  )
}

export default App
