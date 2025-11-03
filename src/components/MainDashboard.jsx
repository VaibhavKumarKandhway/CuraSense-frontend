import React, { Suspense } from 'react';
import { motion } from 'framer-motion';
import { ErrorBoundary } from 'react-error-boundary';
import toast from 'react-hot-toast';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { FileUploadZone } from './FileUploadZone';

// Icon components
const SearchIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

const UploadIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
  </svg>
);

const WarningIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
  </svg>
);

const InfoIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const Card = ({ title, icon: Icon, children }) => {
  const { ref, controls, variants } = useScrollAnimation();
  
  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={variants}
      className="card"
    >
      <h3 className="card-title">
        {Icon && <Icon />}
        {title}
      </h3>
      <ErrorBoundary
        fallback={<div className="error-state">Something went wrong. Please try again.</div>}
      >
        <div className="card-body">{children}</div>
      </ErrorBoundary>
    </motion.section>
  );
};

export default function MainDashboard() {
  return (
    <main className="main">
      <div className="top-row">
        <div className="welcome">
          <h2>Home Dashboard</h2>
          <p>Start by uploading a prescription, entering medicine details, or comparing brands.</p>
        </div>
        <div className="search">
          <SearchIcon />
          <input placeholder="Search medicines, diseases, interactions" />
        </div>
      </div>

      <div className="grid">
        <Card title="Upload / Enter Details">
          <div className="upload-areas">
            <Suspense fallback={<Skeleton height={150} />}>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <FileUploadZone />
              </motion.div>
            </Suspense>
            <motion.div 
              className="upload-box"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => toast.success('Opening manual entry form...')}
            >
              Enter medicine/disease details<br/>
              e.g., Paracetamol 500mg twice daily for 5 days
            </motion.div>
          </div>
          <div className="controls">
            <button className="btn primary">Analyze Medicine</button>
            <button className="btn ghost">Smart Parse</button>
          </div>
        </Card>

        <Card title="NER & Validation Results">
          <table className="result-table">
            <thead>
              <tr>
                <th>Medicine Name</th>
                <th>Dosage</th>
                <th>Frequency</th>
                <th>Duration</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Paracetamol</td>
                <td>500 mg</td>
                <td>2x/day</td>
                <td>5 days</td>
                <td><span className="pill green">✓ Validated</span></td>
              </tr>
              <tr>
                <td>Ibuprofen</td>
                <td>400 mg</td>
                <td>3x/day</td>
                <td>7 days</td>
                <td><span className="pill orange">⚠ Needs Review</span></td>
              </tr>
              <tr>
                <td>Amoxicillin</td>
                <td>—</td>
                <td>—</td>
                <td>—</td>
                <td><span className="pill red">✕ Not Found</span></td>
              </tr>
            </tbody>
          </table>
        </Card>

        <Card title="Alternative Medicine Comparison">
          <div className="alt-compare">
            <div className="compare-box">
              <UploadIcon />
              Upload Original Medicine Image
            </div>
            <div className="compare-box">
              <UploadIcon />
              Upload Alternative Brand Image
            </div>
          </div>
          <table className="compare-table">
            <thead>
              <tr>
                <th>Check</th>
                <th>Original</th>
                <th>Alternative</th>
                <th>Recommendation</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Ingredient Match</td>
                <td><span className="check-icon">✓</span> Match</td>
                <td><span className="check-icon">✓</span> Match</td>
                <td>Substitution acceptable</td>
              </tr>
              <tr>
                <td>Strength/Dosage</td>
                <td>500 mg</td>
                <td>650 mg</td>
                <td className="warn">
                  <WarningIcon />
                  Adjust dosage; consult doctor
                </td>
              </tr>
            </tbody>
          </table>
        </Card>

        <Card title="Safety & Best Practices">
          <div className="safety-grid">
            <div className="safety-card">
              <h4>Safety Report</h4>
              <ul>
                <li>
                  <WarningIcon />
                  History of gastric ulcers — Avoid NSAIDs like Ibuprofen
                </li>
                <li>
                  <WarningIcon />
                  Interactions: Ibuprofen may interact with Warfarin. Monitor.
                </li>
                <li>
                  <InfoIcon />
                  Paracetamol within max 3g/day is generally safe.
                </li>
              </ul>
            </div>
            <div className="best-practices">
              <h4>Best Practices</h4>
              <h5>Recommended dosages</h5>
              <ul>
                <li>Paracetamol: 500mg every 6-8 hours</li>
                <li>Ibuprofen: 200-400mg every 4-6 hours with food</li>
                <li>Consider acetaminophen (if pain present)</li>
                <li>Topical NSAIDs as local option</li>
              </ul>
              <div className="resource-links">
                <a href="#">WHO Guidelines</a>
                <a href="#">NICE Guidance</a>
                <a href="#">FDA Resources</a>
              </div>
            </div>
          </div>
        </Card>

        <Card title="Final Report">
          <div className="final-report">
            <h4>Patient Summary</h4>
            <p># Medication Safety Summary:</p>
            <p>✓ Medicines Analyzed: Paracetamol, Ibuprofen, Amoxicillin<br/>
               ⚠ Safety Considerations: Avoid NSAIDs with gastric ulcers<br/>
               ⚠ Interactions: Warfarin (Monitor)<br/>
               ✓ Notice: Max Paracetamol 3g/day | Take best effective dosage | Consult if unclear</p>
            <div className="report-actions">
              <button className="btn primary">Download Report</button>
              <button className="btn ghost">Share with Doctor</button>
            </div>
          </div>
        </Card>
      </div>
    </main>
  );
}
