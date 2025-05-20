export type DnsRecordType = 'A' | 'AAAA' | 'CNAME' | 'MX' | 'TXT' | 'NS' | 'SRV' | 'SOA'

export interface DnsRecord {
  id: string
  domain_id: string
  type: DnsRecordType
  name: string
  value: string
  ttl: number
  priority?: number  // For MX records
  created_at: string
  updated_at: string
}

export interface DnsRecordFormValues {
  type: DnsRecordType
  name: string
  value: string
  ttl: number
  priority?: number
}