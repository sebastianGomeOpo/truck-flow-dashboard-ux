
import { useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

// Mock data for clients
const clients = [
  { value: "all", label: "Todos los clientes" },
  { value: "terminal-norte", label: "Terminal Norte S.A." },
  { value: "logistica-sur", label: "Logística Sur" },
  { value: "transportes-express", label: "Transportes Express" },
  { value: "distribuidora-central", label: "Distribuidora Central" },
  { value: "cargas-rapidas", label: "Cargas Rápidas Ltda." },
];

export default function ClientSelector() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("all");

  return (
    <div className="flex flex-col space-y-1">
      <label className="text-sm font-medium text-muted-foreground">
        Cliente
      </label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="justify-between bg-white border-blue-100 hover:bg-blue-50"
          >
            {value === "all" ? (
              "Todos los clientes"
            ) : (
              clients.find((client) => client.value === value)?.label
            )}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[300px] p-0">
          <Command>
            <CommandInput placeholder="Buscar cliente..." className="h-9" />
            <CommandList>
              <CommandEmpty>No se encontraron clientes.</CommandEmpty>
              <CommandGroup>
                {clients.map((client) => (
                  <CommandItem
                    key={client.value}
                    value={client.value}
                    onSelect={(currentValue) => {
                      setValue(currentValue === value ? "" : currentValue);
                      setOpen(false);
                    }}
                  >
                    {client.label}
                    <Check
                      className={cn(
                        "ml-auto h-4 w-4",
                        value === client.value ? "opacity-100" : "opacity-0"
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
