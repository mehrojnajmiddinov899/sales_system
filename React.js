import React from 'react';
import { Card, Tag, Avatar, Tooltip } from 'antd';
import { CalendarOutlined, DollarOutlined } from '@ant-design/icons';
 
const STAGE_COLORS = {
 new:         'blue',
   contact:     'cyan',
 needs:       'geekblue',
 proposal:    'purple',
 negotiation: 'orange',
 closed_won:  'green',
 closed_lost: 'red',
};
 
const DealCard = ({ deal, onStageChange }) => {
 const { title, client_name, amount, stage, manager_name, close_date } = deal;
 
 const formatAmount = (val) =>
   new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB',
     maximumFractionDigits: 0 }).format(val);
 
 return (
   <Card
     size="small"
     hoverable
     style={{ marginBottom: 8, borderRadius: 8 }}
   >
     <div style={{ fontWeight: 600, marginBottom: 4 }}>{title}</div>
     <div style={{ color: '#666', fontSize: 12 }}>{client_name}</div>
     <div style={{ marginTop: 8, display: 'flex', justifyContent: 'space-between' }}>
       <span><DollarOutlined /> {formatAmount(amount)}</span>
       {close_date && (
         <span style={{ fontSize: 11 }}>
           <CalendarOutlined /> {new Date(close_date).toLocaleDateString('ru-RU')}
         </span>
       )}
     </div>
     <div style={{ marginTop: 6 }}>
       <Tag color={STAGE_COLORS[stage]}>{stage}</Tag>
       <Tooltip title={manager_name}>
         <Avatar size={20} style={{ backgroundColor: '#1890ff', fontSize: 11 }}>
           {manager_name?.charAt(0).toUpperCase()}
         </Avatar>
       </Tooltip>
     </div>
   </Card>
 );
};
 
export default DealCard;

