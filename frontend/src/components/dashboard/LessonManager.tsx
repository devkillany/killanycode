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
import { Plus, Trash2, GraduationCap, Loader2 } from 'lucide-react';

export function LessonManager() {
  const [lessons, setLessons] = useState<any[]>([]);
  const [languages, setLanguages] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    content: '',
    languageId: '',
    order: '0'
  });

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const [lessonsRes, langsRes] = await Promise.all([
        api.get('/lessons'),
        api.get('/languages')
      ]);
      setLessons(lessonsRes.data);
      setLanguages(langsRes.data);
    } catch (error) {
      console.error('Failed to fetch lessons:', error);
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
      await api.post('/lessons', {
        ...formData,
        order: parseInt(formData.order)
      });
      setIsDialogOpen(false);
      setFormData({ title: '', description: '', content: '', languageId: '', order: '0' });
      fetchData();
    } catch (error) {
      console.error('Failed to create lesson:', error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await api.delete(`/lessons/${id}`);
      fetchData();
    } catch (error) {
      console.error('Failed to delete lesson:', error);
      alert('Failed to delete lesson.');
    }
  };

  if (isLoading) return <div className="flex justify-center p-8"><Loader2 className="animate-spin" /></div>;

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Manage Lessons</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger render={<Button className="gap-2" />}>
            <Plus className="h-4 w-4" /> Add Lesson
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <form onSubmit={handleSubmit}>
              <DialogHeader>
                <DialogTitle>Add New Lesson</DialogTitle>
                <DialogDescription>Create a new programming lesson or tutorial.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="lesson-title">Title</Label>
                  <Input id="lesson-title" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} required />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="lesson-desc">Description</Label>
                  <Input id="lesson-desc" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label>Language</Label>
                    <Select value={(formData.languageId as string) || ''} onValueChange={(val: string) => setFormData({...formData, languageId: val})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Language" />
                      </SelectTrigger>
                      <SelectContent>
                        {languages.map((lang: any) => (
                          <SelectItem key={lang.id} value={lang.id as string}>{lang.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="lesson-order">Order</Label>
                    <Input id="lesson-order" type="number" value={formData.order} onChange={e => setFormData({...formData, order: e.target.value})} />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="lesson-content">Content (Markdown)</Label>
                  <Textarea id="lesson-content" value={formData.content} onChange={e => setFormData({...formData, content: e.target.value})} className="h-48" required />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Create Lesson</Button>
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
              <TableHead>Order</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {lessons.map((lesson) => (
              <TableRow key={lesson.id}>
                <TableCell className="font-medium">{lesson.title}</TableCell>
                <TableCell>{lesson.language?.name}</TableCell>
                <TableCell>{lesson.order}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => handleDelete(lesson.id)}>
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
