import React, { useState } from 'react';
import { AlertCircle, Send } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const RivicUI = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const [transactions, setTransactions] = useState({
    solana: { recipient: '', amount: '' },
    ethereum: { recipient: '', amount: '' },
    ton: { recipient: '', amount: '' },
    polygon: { recipient: '', amount: '' },
  });

  const handleInputChange = (chain, field, value) => {
    setTransactions(prev => ({
      ...prev,
      [chain]: { ...prev[chain], [field]: value }
    }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await fetch('http://localhost:8080/api/execute', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(transactions),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();

      if (data.success) {
        setSuccess(true);
      } else {
        setError(data.message || 'An error occurred while processing the transaction.');
      }
    } catch (err) {
      setError(err.message || 'An error occurred while processing the transaction.');
    } finally {
      setLoading(false);
    }
  };

  // ... rest of the component remains the same

  return (
    <div className="container mx-auto p-4">
      {/* ... existing JSX ... */}
    </div>
  );
};

export default RivicUI;