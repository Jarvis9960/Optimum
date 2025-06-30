
import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Star } from 'lucide-react';

interface Plan {
  id: string;
  name: string;
  tier: 'basic' | 'standard' | 'premium';
  monthlyPrice: number;
  quarterlyPrice: number;
  yearlyPrice: number;
  features: string[];
  popular?: boolean;
}

const SubscriptionPlans: React.FC = () => {
  const { t } = useTranslation();

  const plans: Plan[] = [
    {
      id: 'basic',
      name: t('plans.basic'),
      tier: 'basic',
      monthlyPrice: 29,
      quarterlyPrice: 25,
      yearlyPrice: 20,
      features: [
        'Up to 25 clients',
        'Basic exercise library',
        'Treatment notes',
        'Email support'
      ]
    },
    {
      id: 'standard',
      name: t('plans.standard'),
      tier: 'standard',
      monthlyPrice: 59,
      quarterlyPrice: 53,
      yearlyPrice: 45,
      features: [
        'Up to 100 clients',
        'Full exercise library',
        'Treatment plans',
        'Progress tracking',
        'Priority support',
        'Basic analytics'
      ],
      popular: true
    },
    {
      id: 'premium',
      name: t('plans.premium'),
      tier: 'premium',
      monthlyPrice: 99,
      quarterlyPrice: 89,
      yearlyPrice: 79,
      features: [
        'Unlimited clients',
        'Advanced exercise library',
        'Custom treatment protocols',
        'Advanced analytics',
        'White-label options',
        '24/7 phone support',
        'API access'
      ]
    }
  ];

  const [selectedPeriod, setSelectedPeriod] = React.useState<'monthly' | 'quarterly' | 'yearly'>('quarterly');

  const getPrice = (plan: Plan) => {
    switch (selectedPeriod) {
      case 'monthly':
        return plan.monthlyPrice;
      case 'quarterly':
        return plan.quarterlyPrice;
      case 'yearly':
        return plan.yearlyPrice;
      default:
        return plan.monthlyPrice;
    }
  };

  const getPeriodSavings = (plan: Plan) => {
    if (selectedPeriod === 'monthly') return null;
    const monthlyCost = plan.monthlyPrice;
    const selectedCost = getPrice(plan);
    const savings = Math.round(((monthlyCost - selectedCost) / monthlyCost) * 100);
    return savings;
  };

  return (
    <div className="py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Choose Your Plan
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Select the perfect plan for your physiotherapy practice. All plans include a 14-day free trial.
          </p>
          
          {/* Period Selector */}
          <div className="flex justify-center mt-8">
            <div className="bg-muted p-1 rounded-lg inline-flex">
              {[
                { key: 'monthly', label: t('plans.monthly') },
                { key: 'quarterly', label: t('plans.quarterly') },
                { key: 'yearly', label: t('plans.yearly') }
              ].map((period) => (
                <button
                  key={period.key}
                  onClick={() => setSelectedPeriod(period.key as any)}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    selectedPeriod === period.key
                      ? 'bg-white dark:bg-gray-800 text-primary shadow-sm'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {period.label}
                  {period.key === 'yearly' && (
                    <Badge variant="secondary" className="ml-2 text-xs">
                      Save 20%
                    </Badge>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => {
            const price = getPrice(plan);
            const savings = getPeriodSavings(plan);
            
            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className={`relative h-full ${
                  plan.popular 
                    ? 'border-primary shadow-lg scale-105' 
                    : 'border-border'
                }`}>
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <Badge className="medical-gradient text-white px-3 py-1">
                        <Star className="h-3 w-3 mr-1" />
                        Most Popular
                      </Badge>
                    </div>
                  )}
                  
                  <CardHeader className="text-center pb-8">
                    <CardTitle className="text-xl font-semibold">
                      {plan.name}
                    </CardTitle>
                    <div className="mt-4">
                      <span className="text-4xl font-bold text-primary">
                        ${price}
                      </span>
                      <span className="text-muted-foreground">
                        /{selectedPeriod === 'monthly' ? 'mo' : selectedPeriod === 'quarterly' ? '3mo' : 'year'}
                      </span>
                      {savings && (
                        <div className="text-sm text-green-600 font-medium mt-1">
                          Save {savings}%
                        </div>
                      )}
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-6">
                    <ul className="space-y-3">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center">
                          <Check className="h-4 w-4 text-green-500 mr-3 flex-shrink-0" />
                          <span className="text-sm text-gray-600 dark:text-gray-300">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                    
                    <Button 
                      className={`w-full ${
                        plan.popular 
                          ? 'medical-gradient text-white' 
                          : 'border-primary text-primary hover:bg-primary hover:text-white'
                      }`}
                      variant={plan.popular ? 'default' : 'outline'}
                      size="lg"
                    >
                      Start Free Trial
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPlans;
