
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Settings = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Paramètres</h1>

      <div className="grid gap-6">
        <Card className="p-6">
          <h2 className="text-xl font-bold mb-4">Informations de l'entreprise</h2>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="company-name">Nom de l'entreprise</Label>
              <Input id="company-name" defaultValue="EDOH GESCO" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="address">Adresse</Label>
              <Input id="address" defaultValue="123 Rue du Commerce, Lomé" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="phone">Téléphone</Label>
              <Input id="phone" defaultValue="+228 22 22 22 22" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" defaultValue="contact@edohgesco.com" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-bold mb-4">Paramètres du système</h2>
          <div className="grid gap-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Notifications par email</Label>
                <p className="text-sm text-gray-500">
                  Recevoir des notifications pour les stocks faibles
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Impression automatique</Label>
                <p className="text-sm text-gray-500">
                  Imprimer automatiquement les reçus après chaque vente
                </p>
              </div>
              <Switch />
            </div>
            <div className="grid gap-2">
              <Label>Devise</Label>
              <Select defaultValue="xof">
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner une devise" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="xof">Franc CFA (XOF)</SelectItem>
                  <SelectItem value="eur">Euro (EUR)</SelectItem>
                  <SelectItem value="usd">Dollar US (USD)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-bold mb-4">Sauvegardes</h2>
          <div className="space-y-4">
            <p className="text-sm text-gray-500">
              Dernière sauvegarde : 28 février 2024 à 15:30
            </p>
            <Button>Sauvegarder maintenant</Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Settings;
