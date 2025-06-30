
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  User, 
  Building, 
  CreditCard, 
  Bell, 
  Shield, 
  Globe, 
  Moon, 
  Sun,
  Save,
  Star,
  Calendar
} from 'lucide-react';

const Settings: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { user } = useAuth();
  const { theme, toggleTheme } = useTheme();
  
  const [personalInfo, setPersonalInfo] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone: '+1 (555) 123-4567',
  });

  const [companyInfo, setCompanyInfo] = useState({
    companyName: user?.companyName || '',
    street: user?.address?.street || '',
    zipCode: user?.address?.zipCode || '',
    city: user?.address?.city || '',
    country: user?.address?.country || '',
    vatNumber: user?.vatNumber || '',
  });

  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    appointmentReminders: true,
    treatmentUpdates: false,
    marketingEmails: false,
  });

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'sv', name: 'Svenska' },
    { code: 'fi', name: 'Suomi' },
    { code: 'es', name: 'Español' }
  ];

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Settings
        </h1>
        <p className="text-muted-foreground mt-1">
          Manage your account, preferences, and subscription
        </p>
      </div>

      {/* Personal Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <User className="h-5 w-5" />
            <span>Personal Information</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                value={personalInfo.firstName}
                onChange={(e) => setPersonalInfo({...personalInfo, firstName: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                value={personalInfo.lastName}
                onChange={(e) => setPersonalInfo({...personalInfo, lastName: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={personalInfo.email}
                onChange={(e) => setPersonalInfo({...personalInfo, email: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                value={personalInfo.phone}
                onChange={(e) => setPersonalInfo({...personalInfo, phone: e.target.value})}
              />
            </div>
          </div>
          <Button className="medical-gradient text-white">
            <Save className="h-4 w-4 mr-2" />
            Save Personal Info
          </Button>
        </CardContent>
      </Card>

      {/* Company Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Building className="h-5 w-5" />
            <span>Company Information</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <Label htmlFor="companyName">Company Name</Label>
              <Input
                id="companyName"
                value={companyInfo.companyName}
                onChange={(e) => setCompanyInfo({...companyInfo, companyName: e.target.value})}
              />
            </div>
            <div className="md:col-span-2">
              <Label htmlFor="street">Street Address</Label>
              <Input
                id="street"
                value={companyInfo.street}
                onChange={(e) => setCompanyInfo({...companyInfo, street: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="zipCode">ZIP Code</Label>
              <Input
                id="zipCode"
                value={companyInfo.zipCode}
                onChange={(e) => setCompanyInfo({...companyInfo, zipCode: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                value={companyInfo.city}
                onChange={(e) => setCompanyInfo({...companyInfo, city: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="country">Country</Label>
              <Input
                id="country"
                value={companyInfo.country}
                onChange={(e) => setCompanyInfo({...companyInfo, country: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="vatNumber">VAT Number</Label>
              <Input
                id="vatNumber"
                value={companyInfo.vatNumber}
                onChange={(e) => setCompanyInfo({...companyInfo, vatNumber: e.target.value})}
              />
            </div>
          </div>
          <Button className="medical-gradient text-white">
            <Save className="h-4 w-4 mr-2" />
            Save Company Info
          </Button>
        </CardContent>
      </Card>

      {/* Subscription */}
      {user?.subscriptionTier && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <CreditCard className="h-5 w-5" />
              <span>Subscription</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-primary/5 rounded-lg">
              <div className="flex items-center space-x-3">
                <Star className="h-6 w-6 text-primary" />
                <div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="secondary" className="capitalize">
                      {user.subscriptionTier}
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      {user.subscriptionPeriod}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {user.subscriptionExpiry && (
                      `Expires ${new Date(user.subscriptionExpiry).toLocaleDateString()}`
                    )}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-primary">€49</p>
                <p className="text-sm text-muted-foreground">per month</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Online Programs</Label>
                <div className="mt-1">
                  <div className="flex items-center justify-between text-sm">
                    <span>45 / 100 used</span>
                    <span className="text-muted-foreground">55 remaining</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                    <div className="bg-primary h-2 rounded-full" style={{ width: '45%' }}></div>
                  </div>
                </div>
              </div>
              <div>
                <Label>PDF Programs Generated</Label>
                <p className="text-2xl font-bold text-green-600 mt-1">127</p>
                <p className="text-sm text-muted-foreground">This month</p>
              </div>
            </div>

            <Separator />
            
            <div className="flex space-x-2">
              <Button variant="outline">
                <Calendar className="h-4 w-4 mr-2" />
                Billing History
              </Button>
              <Button variant="outline">
                Upgrade Plan
              </Button>
              <Button variant="outline" className="text-red-600 hover:text-red-700">
                Cancel Subscription
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Preferences */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Shield className="h-5 w-5" />
            <span>Preferences</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Language */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Globe className="h-4 w-4" />
              <div>
                <Label>Language</Label>
                <p className="text-sm text-muted-foreground">Choose your preferred language</p>
              </div>
            </div>
            <Select value={i18n.language} onValueChange={(value) => i18n.changeLanguage(value)}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {languages.map((lang) => (
                  <SelectItem key={lang.code} value={lang.code}>
                    {lang.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Theme */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              {theme === 'light' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              <div>
                <Label>Theme</Label>
                <p className="text-sm text-muted-foreground">Choose light or dark mode</p>
              </div>
            </div>
            <Switch
              checked={theme === 'dark'}
              onCheckedChange={toggleTheme}
            />
          </div>
        </CardContent>
      </Card>

      {/* Notifications */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Bell className="h-5 w-5" />
            <span>Notifications</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {Object.entries(notifications).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between">
              <div>
                <Label className="capitalize">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </Label>
                <p className="text-sm text-muted-foreground">
                  {key === 'emailNotifications' && 'Receive general email notifications'}
                  {key === 'appointmentReminders' && 'Get reminders about upcoming appointments'}
                  {key === 'treatmentUpdates' && 'Updates about treatment progress'}
                  {key === 'marketingEmails' && 'Promotional emails and newsletters'}
                </p>
              </div>
              <Switch
                checked={value}
                onCheckedChange={(checked) => 
                  setNotifications({...notifications, [key]: checked})
                }
              />
            </div>
          ))}
          <Button className="medical-gradient text-white">
            <Save className="h-4 w-4 mr-2" />
            Save Notification Preferences
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Settings;
