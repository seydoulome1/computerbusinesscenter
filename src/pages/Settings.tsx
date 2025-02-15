
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/components/ui/use-toast";
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

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  store: string;
}

const Settings = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [users, setUsers] = useState<User[]>([
    {
      id: "1",
      name: "John Doe",
      email: "john@example.com",
      role: "seller",
      store: "main"
    },
    // Ajoutez d'autres utilisateurs ici si nécessaire
  ]);

  const handleEditUser = (userData: User) => {
    setEditingUser(userData);
    setIsEditDialogOpen(true);
  };

  const handleUpdateUser = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    if (editingUser) {
      const updatedUser = {
        ...editingUser,
        name: formData.get('name') as string,
        email: formData.get('email') as string,
        role: formData.get('role') as string,
        store: formData.get('store') as string,
      };

      setUsers(users.map(user => 
        user.id === editingUser.id ? updatedUser : user
      ));

      toast({
        title: "Modifications enregistrées",
        description: "Les informations de l'utilisateur ont été mises à jour avec succès.",
      });

      setIsEditDialogOpen(false);
    }
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
                  </div>
                  <Button className="w-full">Créer l'utilisateur</Button>
                </DialogContent>
              </Dialog>
            </div>

            <div className="space-y-4">
              <div className="grid gap-4">
                {users.map((user) => (
                  <div key={user.id} className="flex items-center justify-between p-4 bg-secondary rounded-lg">
                    <div>
                      <p className="font-medium">{user.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {user.role === 'seller' ? 'Caissier' : user.role === 'admin' ? 'Administrateur' : 'Superviseur'} - {user.store === 'main' ? 'BOUTIQUE PRINCIPALE' : 'BOUTIQUE ANNEXE'}
                      </p>
                    </div>
                    <Button 
                      variant="outline"
                      onClick={() => handleEditUser(user)}
                    >
                      Modifier
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Modifier l'utilisateur</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleUpdateUser} className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="edit-name">Nom complet</Label>
                    <Input 
                      id="edit-name"
                      name="name"
                      defaultValue={editingUser?.name}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="edit-email">Email</Label>
                    <Input 
                      id="edit-email"
                      name="email"
                      type="email"
                      defaultValue={editingUser?.email}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="edit-role">Rôle</Label>
                    <Select name="role" defaultValue={editingUser?.role}>
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
                    <Label htmlFor="edit-store">Boutique</Label>
                    <Select name="store" defaultValue={editingUser?.store}>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner une boutique" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="main">BOUTIQUE PRINCIPALE</SelectItem>
                        <SelectItem value="annex">BOUTIQUE ANNEXE</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button type="submit" className="w-full">
                    Enregistrer les modifications
                  </Button>
                </form>
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
