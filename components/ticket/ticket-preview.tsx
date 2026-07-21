import Image from "next/image";
import { Calendar, MapPin, QrCode } from "lucide-react";
import { Card } from "@/components/ui/card";

export default function TicketPreview() {
  return (
    <Card className="animate-float relative w-full max-w-[340px] overflow-hidden rounded-3xl border-0 bg-white shadow-2xl md:max-w-[380px]">
      <div className="relative h-56">
        <Image
          src="/demo-memory.jpg"
          alt="Memory"
          fill
          className="object-cover"
        />

        <div className="absolute left-5 top-5 rounded-full bg-white/90 px-3 py-1 text-sm font-semibold">
          🎫 Memory Ticket
        </div>
      </div>

      <div className="space-y-5 p-6">
        <div>
          <h2 className="text-3xl font-bold">Paris</h2>

          <p className="text-muted-foreground">
            Summer Vacation
          </p>
        </div>

        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2">
            <MapPin size={16} />
            France
          </div>

          <div className="flex items-center gap-2">
            <Calendar size={16} />
            July 2026
          </div>
        </div>

        <div className="flex items-center justify-between border-t pt-5">
          <div>
            <p className="text-xs text-muted-foreground">
              Ticket No.
            </p>

            <p className="font-semibold">
              #MT-0001
            </p>
          </div>

          <QrCode size={48} />
        </div>
      </div>
    </Card>
  );
}