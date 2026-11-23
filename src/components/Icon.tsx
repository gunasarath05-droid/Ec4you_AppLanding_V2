import {
  ArrowLeft, ArrowRight, Atom, ChevronRight, Cloud, Flame, Globe, Minus, PenTool, Server, ArrowUpRight, BatteryFull, Bell, BellRing, Bot, BrainCircuit, Building2, CalendarRange,
  ChartColumn, ChartNoAxesColumn, Check, ChevronDown, ChevronLeft, ChevronUp, CircleHelp, CircleUserRound, Compass,
  Cpu, Database, Factory, FileCheck2, FileText, Gauge, GraduationCap, Handshake, HeartPulse, House, LayoutDashboard,
  Layers, Mail, MapPin, Menu, MessageCircle, MessageSquare, MessagesSquare, Orbit, Phone, Plug, Plus, Search, Send,
  Settings, Settings2, Sheet, ShieldCheck, ShoppingBag, ShoppingCart, Signal, Smartphone, Sparkles, Star, Stethoscope,
  Ticket, Truck, User, UserCog, Users, Workflow, Wrench, X, type LucideProps,
} from 'lucide-react';

const ICONS = {
  arrowLeft: ArrowLeft, arrowRight: ArrowRight, atom: Atom, chevronRight: ChevronRight, cloud: Cloud, flame: Flame, globe: Globe, minus: Minus, pen: PenTool, server: Server, arrowUpRight: ArrowUpRight, battery: BatteryFull, bell: Bell,
  bellRing: BellRing, bot: Bot, brain: BrainCircuit, building: Building2, calendar: CalendarRange, chart: ChartColumn,
  bars: ChartNoAxesColumn, check: Check, chevronDown: ChevronDown, chevronLeft: ChevronLeft, chevronUp: ChevronUp,
  help: CircleHelp, account: CircleUserRound, compass: Compass, cpu: Cpu, database: Database, factory: Factory,
  fileCheck: FileCheck2, file: FileText, gauge: Gauge, graduation: GraduationCap, handshake: Handshake, heart: HeartPulse,
  house: House, dashboard: LayoutDashboard, layers: Layers, mail: Mail, mapPin: MapPin, menu: Menu,
  message: MessageCircle, messageSquare: MessageSquare, messages: MessagesSquare, orbit: Orbit, phone: Phone,
  plug: Plug, plus: Plus, search: Search, send: Send, settings: Settings, sliders: Settings2, sheet: Sheet,
  shield: ShieldCheck, bag: ShoppingBag, cart: ShoppingCart, signal: Signal, smartphone: Smartphone,
  sparkles: Sparkles, star: Star, stethoscope: Stethoscope, ticket: Ticket, truck: Truck, user: User,
  userCog: UserCog, users: Users, workflow: Workflow, wrench: Wrench, x: X,
} as const;

export type IconName = keyof typeof ICONS;

/** Icons that point along the reading direction; CSS mirrors them in right-to-left pages. */
const DIRECTIONAL = new Set<IconName>(['arrowLeft', 'arrowRight', 'arrowUpRight', 'chevronLeft', 'chevronRight']);

export function Icon({name, size = 18, className, ...rest}: {name: IconName; size?: number} & Omit<LucideProps, 'ref'>) {
  const C = ICONS[name];
  const cls = [DIRECTIONAL.has(name) ? 'i-dir' : '', className ?? ''].join(' ').trim() || undefined;
  return <C size={size} strokeWidth={1.8} aria-hidden="true" className={cls} {...rest} />;
}

/** Brand marks Lucide no longer ships. */
export function Social({name}: {name: 'linkedin' | 'instagram' | 'facebook' | 'x'}) {
  const d = {
    linkedin: 'M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.5h4V21H3V9.5Zm7 0h3.8v1.6h.06c.53-1 1.83-2.06 3.77-2.06 4.03 0 4.77 2.65 4.77 6.1V21h-4v-5.1c0-1.22-.02-2.79-1.7-2.79-1.7 0-1.96 1.33-1.96 2.7V21h-4V9.5Z',
    instagram: 'M12 7.2a4.8 4.8 0 1 0 0 9.6 4.8 4.8 0 0 0 0-9.6Zm0 7.9a3.1 3.1 0 1 1 0-6.2 3.1 3.1 0 0 1 0 6.2ZM17.2 5.6a1.1 1.1 0 1 0 0 2.2 1.1 1.1 0 0 0 0-2.2ZM12 3c-2.4 0-2.7 0-3.7.06C5 3.2 3.2 5 3.06 8.3 3 9.3 3 9.6 3 12s0 2.7.06 3.7C3.2 19 5 20.8 8.3 20.94c1 .05 1.3.06 3.7.06s2.7 0 3.7-.06c3.3-.15 5.1-1.95 5.24-5.24.05-1 .06-1.3.06-3.7s0-2.7-.06-3.7C20.8 5 19 3.2 15.7 3.06 14.7 3 14.4 3 12 3Z',
    facebook: 'M13.5 21v-7.5h2.53l.38-2.94H13.5V8.69c0-.85.24-1.43 1.46-1.43h1.55V4.64c-.27-.04-1.19-.12-2.26-.12-2.24 0-3.77 1.37-3.77 3.88v2.16H7.95v2.94h2.53V21h3.02Z',
    x: 'M17.75 3h3.07l-6.7 7.66L22 21h-6.17l-4.83-6.32L5.47 21H2.4l7.17-8.2L2 3h6.33l4.36 5.77L17.75 3Zm-1.08 16.17h1.7L7.4 4.73H5.58l11.09 14.44Z',
  }[name];
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d={d} fillRule="evenodd" clipRule="evenodd" />
    </svg>
  );
}
