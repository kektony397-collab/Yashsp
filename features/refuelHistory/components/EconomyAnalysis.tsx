
import React, { useState } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../../../services/db';
import { analyzeEconomy } from '../../../services/geminiService';
import { Loader2, BrainCircuit } from 'lucide-react';

const EconomyAnalysis: React.FC = () => {
    const [analysis, setAnalysis] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const refuelRecords = useLiveQuery(() => db.refuelRecords.toArray());
    const tripLogs = useLiveQuery(() => db.tripLogs.toArray());

    const handleAnalyze = async () => {
        if (!refuelRecords || !tripLogs) return;

        setIsLoading(true);
        setError('');
        setAnalysis('');

        const result = await analyzeEconomy(refuelRecords, tripLogs);

        if ('error' in result) {
            setError(result.error);
        } else {
            setAnalysis(result.analysis);
        }

        setIsLoading(false);
    };

    return (
        <div className="space-y-4">
            <button
                onClick={handleAnalyze}
                disabled={isLoading || !refuelRecords || refuelRecords.length < 2}
                className="w-full flex items-center justify-center px-4 py-2 bg-primary hover:bg-primary/80 text-background font-bold rounded-md disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
                {isLoading ? <Loader2 className="animate-spin w-5 h-5" /> : <BrainCircuit className="w-5 h-5" />}
                <span className="ml-2">Analyze My Fuel Economy</span>
            </button>
             {(!refuelRecords || refuelRecords.length < 2) && (
                <p className="text-sm text-center text-gray-400">
                    Need at least two refuel records to perform analysis.
                </p>
             )}
            {error && <p className="text-red-400 text-sm">{error}</p>}
            {analysis && (
                <div className="p-4 bg-background border border-border rounded-md">
                    <p className="whitespace-pre-wrap text-gray-300">{analysis}</p>
                </div>
            )}
        </div>
    );
};

export default EconomyAnalysis;
