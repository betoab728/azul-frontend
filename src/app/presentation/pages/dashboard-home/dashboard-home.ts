import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard-home',
  imports: [CommonModule],
  templateUrl: './dashboard-home.html',
  styleUrl: './dashboard-home.css'
})
export class DashboardHome {

  // 🟦 BLOQUE 1: KPIs EJECUTIVOS
  executiveKpis = [
    {
      title: 'Solicitudes creadas',
      value: '150',
      trend: '+12%',
      trendUp: true,
      description: 'Total periodo',
      icon: 'fas fa-clipboard-list',
      colorClass: 'bg-blue-50 text-blue-700'
    },
    {
      title: 'Cotizaciones emitidas',
      value: '120',
      trend: '+8%',
      trendUp: true,
      description: 'Generadas',
      icon: 'fas fa-file-invoice-dollar',
      colorClass: 'bg-yellow-50 text-yellow-700'
    },
    {
      title: 'Órdenes de servicio',
      value: '98',
      trend: '+15%',
      trendUp: true,
      description: 'Confirmadas',
      icon: 'fas fa-truck-loading',
      colorClass: 'bg-indigo-50 text-indigo-700'
    },
    {
      title: 'Cantidad gestionada',
      value: '845.2 t',
      subValue: '12,500 L',
      trend: '+5%',
      trendUp: true,
      description: 'Total global',
      icon: 'fas fa-weight-hanging',
      colorClass: 'bg-green-50 text-green-700'
    }
  ];

  // 🟦 BLOQUE 2: OPERACIÓN
  wasteStats = [
    { type: 'Residuos Sólidos', amount: '620 t', percentage: 75, color: 'bg-blue-600' },
    { type: 'Residuos Líquidos', amount: '225 t', percentage: 25, color: 'bg-cyan-500' }
  ];

  topWastes = [
    { name: 'Cartón / Papel', amount: '180 t', trend: '↑' },
    { name: 'Plástico PET', amount: '120 t', trend: '→' },
    { name: 'Aceite Usado', amount: '85 t', trend: '↑' },
    { name: 'Metales Ferrosos', amount: '60 t', trend: '↓' },
    { name: 'Orgánicos', amount: '45 t', trend: '↑' }
  ];

  fleetStatus = {
    active: 14,
    maintenance: 2,
    outOfService: 1,
    total: 17,
    operationalPercentage: 82.35
  };

  get fleetDonutSegments() {
    const total = this.fleetStatus.total || 1;
    const activePct = (this.fleetStatus.active / total) * 100;
    const maintPct = (this.fleetStatus.maintenance / total) * 100;
    const outPct = (this.fleetStatus.outOfService / total) * 100;

    // SVG Circle setup
    const r = 16; // radius
    const c = 2 * Math.PI * r; // circumference ~ 100.53

    return [
      {
        percent: activePct,
        dashArray: `${(activePct / 100) * c} ${c}`,
        dashOffset: 0,
        color: '#22c55e' // Green
      },
      {
        percent: maintPct,
        dashArray: `${(maintPct / 100) * c} ${c}`,
        dashOffset: -((activePct / 100) * c),
        color: '#eab308' // Yellow
      },
      {
        percent: outPct,
        dashArray: `${(outPct / 100) * c} ${c}`,
        dashOffset: -(((activePct + maintPct) / 100) * c),
        color: '#ef4444' // Red
      }
    ];
  }

  // 📈 GRÁFICO DE TENDENCIAS
  trendData = [
    { date: '01/01', requests: 12, quantity: 320 },
    { date: '02/01', requests: 18, quantity: 410 },
    { date: '03/01', requests: 15, quantity: 380 },
    { date: '04/01', requests: 22, quantity: 550 },
    { date: '05/01', requests: 20, quantity: 490 },
    { date: '06/01', requests: 25, quantity: 600 },
    { date: '07/01', requests: 30, quantity: 680 },
    { date: '08/01', requests: 28, quantity: 620 },
    { date: '09/01', requests: 35, quantity: 750 }
  ];

  get trendPaths() {
    return {
      requests: this.generatePath(this.trendData.map(d => d.requests), 100, 50),
      quantity: this.generatePath(this.trendData.map(d => d.quantity), 100, 50)
    };
  }

  generatePath(data: number[], width: number, height: number): string {
    if (data.length === 0) return '';
    const max = Math.max(...data);
    const min = Math.min(...data);
    const stepX = width / (data.length - 1);
    // Normalizar Y (invertido porque SVG Y crece hacia abajo)
    const points = data.map((val, i) => {
      const x = i * stepX;
      // Normalizar entre 10% y 90% de altura para padding
      const y = height - ((val - min) / (max - min || 1)) * (height * 0.8) - (height * 0.1);
      return `${x},${y}`;
    });
    return `M ${points.join(' L ')}`;
  }

  // 🟦 BLOQUE 3: CUMPLIMIENTO
  complianceStats = {
    routesCompleted: 125,
    routesPlanned: 130,
    delayedRequests: 8,
    avgServiceTime: '45 min'
  };

  // 🟦 BLOQUE 4: GEOGRÁFICO
  geoZones = [
    { name: 'Zona Industrial Norte', amount: '350 t', status: 'Crítico' },
    { name: 'Parque Logístico Sur', amount: '210 t', status: 'Normal' },
    { name: 'Centro Urbano', amount: '125 t', status: 'Normal' },
    { name: 'Puerto Marítimo', amount: '160 t', status: 'Alert' }
  ];

}

