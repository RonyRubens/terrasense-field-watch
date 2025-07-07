
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { supabase } from "@/integrations/supabase/client";
import { Plus, X, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const sensorSchema = z.object({
  id: z.string().min(1, "ID do sensor é obrigatório"),
  umidade: z.number().min(0).max(100).optional(),
  ativo: z.boolean().default(true),
  epoch: z.string().optional(),
});

type SensorFormData = z.infer<typeof sensorSchema>;

interface AddSensorFormProps {
  onSensorAdded: () => void;
  onClose: () => void;
}

const AddSensorForm = ({ onSensorAdded, onClose }: AddSensorFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<SensorFormData>({
    resolver: zodResolver(sensorSchema),
    defaultValues: {
      id: "",
      umidade: undefined,
      ativo: true,
      epoch: "",
    },
  });

  const onSubmit = async (data: SensorFormData) => {
    setIsSubmitting(true);
    try {
      const { error } = await supabase
        .from('sensores')
        .insert([{
          id: data.id,
          umidade: data.umidade || null,
          ativo: data.ativo,
          epoch: data.epoch || new Date().getTime().toString(),
        }]);

      if (error) throw error;

      toast({
        title: "Sensor adicionado com sucesso!",
        description: `Sensor ${data.id} foi cadastrado no sistema.`,
      });

      form.reset();
      onSensorAdded();
      onClose();
    } catch (error) {
      console.error('Erro ao adicionar sensor:', error);
      toast({
        title: "Erro ao adicionar sensor",
        description: "Verifique se o ID do sensor não está duplicado.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center space-x-2">
              <Plus className="w-5 h-5" />
              <span>Adicionar Sensor</span>
            </CardTitle>
            <CardDescription>
              Cadastre um novo sensor no sistema
            </CardDescription>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ID do Sensor</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Ex: SENSOR_001" 
                      {...field} 
                      disabled={isSubmitting}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="umidade"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Umidade Inicial (%)</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      min="0" 
                      max="100" 
                      placeholder="Ex: 45"
                      {...field}
                      onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : undefined)}
                      disabled={isSubmitting}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="epoch"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Epoch (Opcional)</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Timestamp do sensor"
                      {...field}
                      disabled={isSubmitting}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="ativo"
                {...form.register("ativo")}
                disabled={isSubmitting}
                className="w-4 h-4"
              />
              <Label htmlFor="ativo">Sensor ativo</Label>
            </div>

            <div className="flex space-x-2 pt-4">
              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="flex-1"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Adicionando...
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4 mr-2" />
                    Adicionar Sensor
                  </>
                )}
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                onClick={onClose}
                disabled={isSubmitting}
              >
                Cancelar
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default AddSensorForm;
