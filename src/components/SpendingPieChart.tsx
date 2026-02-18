import React from "react";

interface SpendingSegment {
  label: string;
  value: number;
  color: string;
}

interface SpendingPieChartProps {
  segments: SpendingSegment[];
}

const formatCurrency = (value: number): string => `$${value.toFixed(2)}`;

const SpendingPieChart: React.FC<SpendingPieChartProps> = ({ segments }) => {
  const total = segments.reduce((runningTotal, segment) => {
    return runningTotal + segment.value;
  }, 0);

  const gradient = segments.length
    ? segments
        .reduce(
          (gradientSegments, segment) => {
            const start = gradientSegments.runningPercent;
            const sweep = (segment.value / total) * 100;
            const end = start + sweep;

            gradientSegments.runningPercent = end;
            gradientSegments.slices.push(
              `${segment.color} ${start}% ${end}%`
            );

            return gradientSegments;
          },
          { runningPercent: 0, slices: [] as string[] }
        )
        .slices.join(", ")
    : "";

  return (
    <section className="analytics-section">
      <h3 className="section-heading">Spending Breakdown</h3>

      {segments.length === 0 ? (
        <p className="empty-state">
          Add transactions to generate the spending distribution chart.
        </p>
      ) : (
        <div className="pie-chart-layout">
          <div
            className="pie-chart"
            style={{ background: `conic-gradient(${gradient})` }}
            role="img"
            aria-label="Pie chart showing spending by category"
          >
            <div className="pie-chart-core">
              <p className="pie-total-label">Total Spent</p>
              <p className="pie-total-value">{formatCurrency(total)}</p>
            </div>
          </div>

          <ul className="chart-legend">
            {segments.map((segment) => (
              <li key={segment.label} className="legend-row">
                <div className="legend-meta">
                  <span
                    className="legend-swatch"
                    style={{ backgroundColor: segment.color }}
                    aria-hidden="true"
                  />
                  <span>{segment.label}</span>
                </div>
                <span>{formatCurrency(segment.value)}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
};

export default SpendingPieChart;
