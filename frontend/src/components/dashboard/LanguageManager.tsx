'use client';

import { useState, useEffect } from 'react';
import api from '@/lib/api';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, Trash2, Globe, Loader2 } from 'lucide-react';

export function LanguageManager() {
  const [languages, setLanguages] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    icon: '',
    slug: ''
  });

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await api.get('/languages');
      setLanguages(response.data);
    } catch (error) {
      console.error('Failed to fetch languages:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/languages', formData);
      setIsDialogOpen(false);
      setFormData({ name: '', icon: '', slug: '' });
      fetchData();
    } catch (error) {
      console.error('Failed to create language:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this language? Items linked to it may break!')) return;
    try {
      await api.delete(`/languages/${id}`);
      fetchData();
    } catch (error) {
      console.error('Failed to delete language:', error);
    }
  };

  if (isLoading) return <div className="flex justify-center p-8"><Loader2 className="animate-spin" /></div>;

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Manage Languages</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger render={<Button className="gap-2" />}>
            <Plus className="h-4 w-4" /> Add Language
          </DialogTrigger>
          <DialogContent>
            <form onSubmit={handleSubmit}>
              <DialogHeader>
                <DialogTitle>Add New Language</DialogTitle>
                <DialogDescription>Add a new programming language to the platform.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="lang-name">Name</Label>
                  <Input id="lang-name" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} placeholder="JavaScript" required />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="lang-icon">Icon (Emoji or text)</Label>
                  <Input id="lang-icon" value={formData.icon} onChange={e => setFormData({...formData, icon: e.target.value})} placeholder="JS" required />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="lang-slug">Slug (lowercase)</Label>
                  <Input id="lang-slug" value={formData.slug} onChange={e => setFormData({...formData, slug: e.target.value})} placeholder="javascript" required />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Create Language</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Icon</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Slug</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {languages.map((lang) => (
              <TableRow key={lang.id}>
                <TableCell className="font-bold">{lang.icon}</TableCell>
                <TableCell>{lang.name}</TableCell>
                <TableCell>{lang.slug}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => handleDelete(lang.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
