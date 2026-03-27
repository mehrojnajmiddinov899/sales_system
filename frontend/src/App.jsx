import { useState, useEffect } from 'react'
import axios from 'axios'

const API = 'http://127.0.0.1:8000/api'

const styles = {
  app: { fontFamily: 'Arial, sans-serif', background: '#0f2044', minHeight: '100vh', color: '#fff' },
  header: { background: '#1a3a6e', padding: '16px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '3px solid #e8431a' },
  title: { fontSize: 22, fontWeight: 'bold', color: '#fff', margin: 0 },
  nav: { display: 'flex', gap: 12 },
  navBtn: { padding: '8px 20px', borderRadius: 8, border: 'none', cursor: 'pointer', fontWeight: 'bold', fontSize: 14 },
  content: { padding: 32 },
  statsRow: { display: 'flex', gap: 20, marginBottom: 32 },
  statCard: { background: '#1a3a6e', borderRadius: 12, padding: '20px 28px', flex: 1, borderTop: '4px solid #e8431a' },
  statNum: { fontSize: 42, fontWeight: 'bold', color: '#e8431a' },
  statLabel: { fontSize: 14, color: '#94a3b8', marginTop: 4 },
  table: { width: '100%', borderCollapse: 'collapse', background: '#1a3a6e', borderRadius: 12, overflow: 'hidden' },
  th: { padding: '14px 18px', textAlign: 'left', background: '#0f2044', color: '#94a3b8', fontSize: 13, fontWeight: 'bold' },
  td: { padding: '14px 18px', borderBottom: '1px solid #0f2044', fontSize: 14 },
  badge: { padding: '4px 12px', borderRadius: 20, fontSize: 12, fontWeight: 'bold' },
  sectionTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 16, color: '#fff' },
  addBtn: { background: '#e8431a', color: '#fff', border: 'none', padding: '10px 22px', borderRadius: 8, cursor: 'pointer', fontWeight: 'bold', marginBottom: 16 },
}

const stageColors = {
  new: { bg: '#1e3a5f', text: '#60a5fa', label: 'Новая' },
  contact: { bg: '#1e3a5f', text: '#34d399', label: 'Контакт' },
  needs: { bg: '#3b2f1e', text: '#fbbf24', label: 'Потребности' },
  proposal: { bg: '#2d1e3b', text: '#a78bfa', label: 'Предложение' },
  negotiation: { bg: '#1e2e3b', text: '#38bdf8', label: 'Переговоры' },
  closed_won: { bg: '#1e3b2a', text: '#4ade80', label: 'Успешно' },
  closed_lost: { bg: '#3b1e1e', text: '#f87171', label: 'Отказ' },
}

export default function App() {
  const [tab, setTab] = useState('dashboard')
  const [clients, setClients] = useState([])
  const [deals, setDeals] = useState([])
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    const cfg = { auth: { username: 'admin', password:'2004' } }
    axios.get(`${API}/clients/`, cfg).then(r => setClients(r.data)).catch(() => {})
    axios.get(`${API}/deals/`, cfg).then(r => setDeals(r.data)).catch(() => {})
    axios.get(`${API}/tasks/`, cfg).then(r => setTasks(r.data)).catch(() => {})
  }, [])

  return (
    <div style={styles.app}>
      <div style={styles.header}>
        <h1 style={styles.title}>📊 Система управления продажами</h1>
        <div style={styles.nav}>
          {[['dashboard','Дашборд'],['clients','Клиенты'],['deals','Сделки'],['tasks','Задачи']].map(([key, label]) => (
            <button key={key} onClick={() => setTab(key)} style={{
              ...styles.navBtn,
              background: tab === key ? '#e8431a' : '#0f2044',
              color: '#fff'
            }}>{label}</button>
          ))}
          <button style={{...styles.navBtn, background:'#0f2044', color:'#94a3b8'}}
            onClick={() => window.open('http://127.0.0.1:8000/admin')}>
            ⚙️ Админка
          </button>
        </div>
      </div>

      <div style={styles.content}>

        {tab === 'dashboard' && (
          <>
            <div style={styles.statsRow}>
              {[
                { num: clients.length, label: 'Клиентов' },
                { num: deals.length, label: 'Сделок' },
                { num: tasks.length, label: 'Задач' },
                { num: deals.filter(d => d.stage === 'closed_won').length, label: 'Успешных сделок' },
              ].map((s, i) => (
                <div key={i} style={styles.statCard}>
                  <div style={styles.statNum}>{s.num}</div>
                  <div style={styles.statLabel}>{s.label}</div>
                </div>
              ))}
            </div>
            <div style={styles.sectionTitle}>Последние сделки</div>
            <table style={styles.table}>
              <thead>
                <tr>
                  {['Название','Сумма','Стадия'].map(h => <th key={h} style={styles.th}>{h}</th>)}
                </tr>
              </thead>
              <tbody>
                {deals.slice(0,5).map(d => (
                  <tr key={d.id}>
                    <td style={styles.td}>{d.title}</td>
                    <td style={styles.td}>{Number(d.amount).toLocaleString('ru-RU')} ₽</td>
                    <td style={styles.td}>
                      <span style={{...styles.badge, background: stageColors[d.stage]?.bg || '#1e3a5f', color: stageColors[d.stage]?.text || '#fff'}}>
                        {stageColors[d.stage]?.label || d.stage}
                      </span>
                    </td>
                  </tr>
                ))}
                {deals.length === 0 && <tr><td style={{...styles.td, color:'#64748b'}} colSpan={3}>Нет сделок — добавьте через Админку</td></tr>}
              </tbody>
            </table>
          </>
        )}

        {tab === 'clients' && (
          <>
            <div style={styles.sectionTitle}>👥 Клиенты</div>
            <button style={styles.addBtn} onClick={() => window.open('http://127.0.0.1:8000/admin/deals/client/add/')}>+ Добавить клиента</button>
            <table style={styles.table}>
              <thead><tr>{['Компания','ИНН','Отрасль','Источник'].map(h => <th key={h} style={styles.th}>{h}</th>)}</tr></thead>
              <tbody>
                {clients.map(c => (
                  <tr key={c.id}>
                    <td style={styles.td}>{c.company_name}</td>
                    <td style={styles.td}>{c.inn}</td>
                    <td style={styles.td}>{c.industry || '—'}</td>
                    <td style={styles.td}>{c.source}</td>
                  </tr>
                ))}
                {clients.length === 0 && <tr><td style={{...styles.td, color:'#64748b'}} colSpan={4}>Нет клиентов</td></tr>}
              </tbody>
            </table>
          </>
        )}

        {tab === 'deals' && (
          <>
            <div style={styles.sectionTitle}>📊 Сделки</div>
            <button style={styles.addBtn} onClick={() => window.open('http://127.0.0.1:8000/admin/deals/deal/add/')}>+ Добавить сделку</button>
            <table style={styles.table}>
              <thead><tr>{['Название','Сумма','Стадия','Дата закрытия'].map(h => <th key={h} style={styles.th}>{h}</th>)}</tr></thead>
              <tbody>
                {deals.map(d => (
                  <tr key={d.id}>
                    <td style={styles.td}>{d.title}</td>
                    <td style={styles.td}>{Number(d.amount).toLocaleString('ru-RU')} ₽</td>
                    <td style={styles.td}>
                      <span style={{...styles.badge, background: stageColors[d.stage]?.bg || '#1e3a5f', color: stageColors[d.stage]?.text || '#fff'}}>
                        {stageColors[d.stage]?.label || d.stage}
                      </span>
                    </td>
                    <td style={styles.td}>{d.close_date || '—'}</td>
                  </tr>
                ))}
                {deals.length === 0 && <tr><td style={{...styles.td, color:'#64748b'}} colSpan={4}>Нет сделок</td></tr>}
              </tbody>
            </table>
          </>
        )}

        {tab === 'tasks' && (
          <>
            <div style={styles.sectionTitle}>✅ Задачи</div>
            <button style={styles.addBtn} onClick={() => window.open('http://127.0.0.1:8000/admin/deals/task/add/')}>+ Добавить задачу</button>
            <table style={styles.table}>
              <thead><tr>{['Название','Приоритет','Статус','Срок'].map(h => <th key={h} style={styles.th}>{h}</th>)}</tr></thead>
              <tbody>
                {tasks.map(t => (
                  <tr key={t.id}>
                    <td style={styles.td}>{t.title}</td>
                    <td style={styles.td}>{t.priority}</td>
                    <td style={styles.td}>{t.status}</td>
                    <td style={styles.td}>{t.due_date ? new Date(t.due_date).toLocaleDateString('ru-RU') : '—'}</td>
                  </tr>
                ))}
                {tasks.length === 0 && <tr><td style={{...styles.td, color:'#64748b'}} colSpan={4}>Нет задач</td></tr>}
              </tbody>
            </table>
          </>
        )}

      </div>
    </div>
  )
}

