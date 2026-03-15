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
import { Textarea } from '@/components/ui/textarea';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Plus, Trash2, Edit, Loader2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export function SnippetManager() {
  const { t } = useTranslation();
  const [snippets, setSnippets] = useState<any[]>([]);
  const [languages, setLanguages] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    code: '',
    languageId: '',
    categoryId: '',
    tags: ''
  });

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const [snippetsRes, langsRes, catsRes] = await Promise.all([
        api.get('/snippets'),
        api.get('/languages'),
        api.get('/categories')
      ]);
      setSnippets(snippetsRes.data);
      setLanguages(langsRes.data);
      setCategories(catsRes.data);
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
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
      await api.post('/snippets', {
        ...formData,
        tags: formData.tags.split(',').map(tag => tag.trim())
      });
      setIsDialogOpen(false);
      setFormData({ title: '', description: '', code: '', languageId: '', categoryId: '', tags: '' });
      fetchData();
    } catch (error) {
      console.error('Failed to create snippet:', error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await api.delete(`/snippets/${id}`);
      fetchData();
    } catch (error) {
      console.error('Failed to delete snippet:', error);
      alert('Failed to delete snippet. Please check backend logs.');
    }
  };

  if (isLoading) return <div className="flex justify-center p-8"><Loader2 className="animate-spin" /></div>;

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Manage Snippets</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger render={<Button className="gap-2" />}>
            <Plus className="h-4 w-4" /> Add Snippet
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <form onSubmit={handleSubmit}>
              <DialogHeader>
                <DialogTitle>Add New Snippet</DialogTitle>
                <DialogDescription>Create a new code snippet for your users.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="title">Title</Label>
                  <Input id="title" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} required />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="description">Description</Label>
                  <Input id="description" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label>Language</Label>
                    <Select value={(formData.languageId as string) || ''} onValueChange={(val: string) => setFormData({...formData, languageId: val})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Language" />
                      </SelectTrigger>
                      <SelectContent className="z-(--z-index-dialog)">
                        {languages.map((lang: any) => (
                          <SelectItem key={lang.id} value={lang.id as string}>{lang.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label>Category</Label>
                    <Select value={(formData.categoryId as string) || ''} onValueChange={(val: string) => setFormData({...formData, categoryId: val})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Category" />
                      </SelectTrigger>
                      <SelectContent className="z-(--z-index-dialog)">
                        {categories.map((cat: any) => (
                          <SelectItem key={cat.id} value={cat.id as string}>{cat.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="code">Code</Label>
                  <Textarea id="code" value={formData.code} onChange={e => setFormData({...formData, code: e.target.value})} className="font-mono h-32" required />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="tags">Tags (comma separated)</Label>
                  <Input id="tags" value={formData.tags} onChange={e => setFormData({...formData, tags: e.target.value})} placeholder="react, hooks, ui" />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Create Snippet</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Language</TableHead>
              <TableHead>Category</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {snippets.map((snippet) => (
              <TableRow key={snippet.id}>
                <TableCell className="font-medium">{snippet.title}</TableCell>
                <TableCell>{snippet.language?.name}</TableCell>
                <TableCell>{snippet.category?.name}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => handleDelete(snippet.id)}>
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
