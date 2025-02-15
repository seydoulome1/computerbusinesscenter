import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/useAuth";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const Settings = () => {
  const { user } = useAuth();
  const [editingUser, setEditingUser] = useState(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const handleEditUser = (userData) => {
    setEditingUser(userData);
    setIsEditDialogOpen(true);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Paramètres</h1>

      <div className="grid gap-6">
        {user.role === "admin" && (
          <Card className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Gestion des Utilisateurs</h2>
              <Dialog>
                <DialogTrigger asChild>
                  <Button>Nouvel Utilisateur</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Créer un nouvel utilisateur</DialogTitle>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="name">Nom complet</Label>
                      <Input id="name" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="role">Rôle</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionner un rôle" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="admin">Administrateur</SelectItem>
                          <SelectItem value="supervisor">Superviseur</SelectItem>
                          <SelectItem value="seller">Caissier</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="store">Boutique</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionner une boutique" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="main">BOUTIQUE PRINCIPALE</SelectItem>
                          <SelectItem value="annex">BOUTIQUE ANNEXE</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="password">Mot de passe</Label>
                      <Input id="password" type="password" />
                    </div>
                  </div>
                  <Button className="w-full">Créer l'utilisateur</Button>
                </DialogContent>
              </Dialog>
            </div>

            <div className="space-y-4">
              <div className="grid gap-4">
                <div className="flex items-center justify-between p-4 bg-secondary rounded-lg">
                  <div>
                    <p className="font-medium">John Doe</p>
                    <p className="text-sm text-muted-foreground">Caissier - BOUTIQUE PRINCIPALE</p>
                  </div>
                  <Button 
                    variant="outline"
                    onClick={() => handleEditUser({
                      name: "John Doe",
                      role: "seller",
                      store: "main",
                      email: "john@example.com"
                    })}
                  >
                    Modifier
                  </Button>
                </div>
              </div>
            </div>

            <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Modifier l'utilisateur</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label>Nom complet</Label>
                    <Input 
                      defaultValue={editingUser?.name}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label>Email</Label>
                    <Input 
                      type="email"
                      defaultValue={editingUser?.email}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label>Rôle</Label>
                    <Select defaultValue={editingUser?.role}>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner un rôle" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="admin">Administrateur</SelectItem>
                        <SelectItem value="supervisor">Superviseur</SelectItem>
                        <SelectItem value="seller">Caissier</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label>Boutique</Label>
                    <Select defaultValue={editingUser?.store}>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner une boutique" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="main">BOUTIQUE PRINCIPALE</SelectItem>
                        <SelectItem value="annex">BOUTIQUE ANNEXE</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <Button className="w-full" onClick={() => setIsEditDialogOpen(false)}>
                  Enregistrer les modifications
                </Button>
              </DialogContent>
            </Dialog>
          </Card>
        )}

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
