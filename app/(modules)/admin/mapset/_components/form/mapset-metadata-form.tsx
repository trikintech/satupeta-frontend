"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { z } from "zod";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/components/ui/form";
import { Input } from "@/shared/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import { Button } from "@/shared/components/ui/button";
import { Loader2 } from "lucide-react";
import { fetchWMSLayersFromSourceId } from "@/shared/services/map-layer";
import { fetchGeoNetworkLayersFromSourceId } from "@/shared/services/metadata-url";

const metadataSchema = z.object({
  source_id: z.string().min(1, "Map Server harus dipilih"),
  layer_url: z.string().min(1, "Link Map Server harus diisi"),
  metadata_source_id: z.string().min(1, "Metadata Server harus dipilih"),
  metadata_url: z.string().min(1, "Link Metadata Server harus diisi"),
});

type MetadataFormValues = z.infer<typeof metadataSchema>;

interface SelectOption {
  id: string;
  name: string;
}

interface MapsetMetadataFormProps {
  initialData: Partial<MetadataFormValues>;
  mapSources: SelectOption[];
  onSubmit: (data: MetadataFormValues) => void;
  onPrevious: () => void;
}

interface LayerOption {
  name: string;
  url: string;
}

export function MapsetMetadataForm({
  initialData,
  mapSources,
  onSubmit,
  onPrevious,
}: MapsetMetadataFormProps) {
  const form = useForm<MetadataFormValues>({
    resolver: zodResolver(metadataSchema),
    defaultValues: {
      source_id: initialData.source_id || "",
      layer_url: initialData.layer_url || "",
      metadata_source_id: initialData.metadata_source_id || "",
      metadata_url: initialData.metadata_url || "",
    },
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState(searchQuery);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const sourceId = useWatch({ control: form.control, name: "source_id" });
  const metadataSourceId = useWatch({
    control: form.control,
    name: "metadata_source_id",
  });

  const [layerOptions, setLayerOptions] = useState<LayerOption[]>([]);
  const [metadataOptions, setMetadataOptions] = useState<LayerOption[]>([]);

  const [loadingLayers, setLoadingLayers] = useState(false);
  const [loadingMetadata, setLoadingMetadata] = useState(false);

  const mapSourcesWithOthers = [
    ...mapSources,
    { id: "lainnya", name: "Lainnya" },
  ];

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
      if (
        searchInputRef.current &&
        document.activeElement === searchInputRef.current
      ) {
        requestAnimationFrame(() => {
          searchInputRef.current?.focus();
        });
      }
    }, 300);

    return () => clearTimeout(timerId);
  }, [searchQuery]);

  const filteredLayerOptions = useMemo(() => {
    if (!debouncedSearchQuery) return layerOptions;
    const query = debouncedSearchQuery.toLowerCase();
    return layerOptions.filter((layer) =>
      layer.name.toLowerCase().includes(query)
    );
  }, [debouncedSearchQuery, layerOptions]);

  const filteredMetadataOptions = useMemo(() => {
    if (!debouncedSearchQuery) return metadataOptions;
    const query = debouncedSearchQuery.toLowerCase();
    return metadataOptions.filter((meta) =>
      meta.name.toLowerCase().includes(query)
    );
  }, [debouncedSearchQuery, metadataOptions]);

  useEffect(() => {
    const loadLayers = async () => {
      if (!sourceId || sourceId === "lainnya") {
        setLayerOptions([]);
        return;
      }

      setLoadingLayers(true);
      try {
        const layers = await fetchWMSLayersFromSourceId(sourceId);
        setLayerOptions(layers);
      } catch (error) {
        console.error("Failed to fetch layers:", error);
        setLayerOptions([]);
      } finally {
        setLoadingLayers(false);
      }
    };

    loadLayers();
  }, [sourceId]);

  useEffect(() => {
    const loadMetadata = async () => {
      if (!metadataSourceId || metadataSourceId === "lainnya") {
        setMetadataOptions([]);
        return;
      }

      setLoadingMetadata(true);
      try {
        const metadata = await fetchGeoNetworkLayersFromSourceId(
          metadataSourceId
        );

        console.log(metadata);
        setMetadataOptions(metadata);
      } catch (error) {
        console.error("Failed to fetch metadata:", error);
        setMetadataOptions([]);
      } finally {
        setLoadingMetadata(false);
      }
    };

    loadMetadata();
  }, [metadataSourceId]);

  useEffect(() => {
    form.reset(initialData);
  }, [initialData, form]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 p-6">
        {/* MAP SERVER */}
        <FormField
          control={form.control}
          name="source_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Pilih MapServer<span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Pilih server untuk menyimpan data" />
                  </SelectTrigger>
                  <SelectContent>
                    {mapSourcesWithOthers.map((source) => (
                      <SelectItem key={source.id} value={source.id}>
                        {source.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* LAYER URL */}
        {sourceId === "lainnya" ? (
          <FormField
            control={form.control}
            name="layer_url"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  URL Layer<span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Masukkan URL layer secara manual"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ) : (
          <FormField
            control={form.control}
            name="layer_url"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Pilih Layer<span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Select
                    value={field.value}
                    onValueChange={field.onChange}
                    disabled={loadingLayers}
                    onOpenChange={(open) => {
                      if (!open) setSearchQuery("");
                      else setTimeout(() => searchInputRef.current?.focus(), 0);
                    }}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue
                        placeholder={
                          loadingLayers
                            ? "Memuat layer..."
                            : "Pilih layer dari server"
                        }
                      />
                    </SelectTrigger>
                    <SelectContent className="min-w-[300px]">
                      <div className="p-2 sticky top-0 bg-background z-10">
                        <Input
                          placeholder="Cari layer..."
                          value={searchQuery}
                          ref={searchInputRef}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          onKeyDown={(e) =>
                            e.key === "Escape" &&
                            (e.target as HTMLInputElement).blur()
                          }
                          className="mb-2"
                          autoFocus
                        />
                      </div>
                      {loadingLayers ? (
                        <div className="p-4 text-center">
                          <Loader2 className="mx-auto h-6 w-6 animate-spin" />
                        </div>
                      ) : filteredLayerOptions.length > 0 ? (
                        filteredLayerOptions.map((layer) => (
                          <SelectItem key={layer.url} value={layer.url}>
                            {layer.name}
                          </SelectItem>
                        ))
                      ) : (
                        <div className="p-2 text-center text-sm text-muted-foreground">
                          Tidak ada layer yang sesuai
                        </div>
                      )}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        {/* METADATA SERVER */}
        <FormField
          control={form.control}
          name="metadata_source_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Pilih Metadata Server<span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Pilih metadata server" />
                  </SelectTrigger>
                  <SelectContent>
                    {mapSourcesWithOthers.map((source) => (
                      <SelectItem key={source.id} value={source.id}>
                        {source.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* METADATA URL */}
        {metadataSourceId === "lainnya" ? (
          <FormField
            control={form.control}
            name="metadata_url"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  URL Metadata<span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Masukkan URL metadata secara manual"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ) : (
          <FormField
            control={form.control}
            name="metadata_url"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Pilih Metadata<span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Select
                    value={field.value}
                    onValueChange={field.onChange}
                    disabled={loadingMetadata}
                    onOpenChange={(open) => {
                      if (!open) setSearchQuery("");
                      else setTimeout(() => searchInputRef.current?.focus(), 0);
                    }}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue
                        placeholder={
                          loadingMetadata
                            ? "Memuat metadata..."
                            : "Pilih metadata dari server"
                        }
                      />
                    </SelectTrigger>
                    <SelectContent className="min-w-[300px]">
                      <div className="p-2 sticky top-0 bg-background z-10">
                        <Input
                          placeholder="Cari metadata..."
                          value={searchQuery}
                          ref={searchInputRef}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          onKeyDown={(e) =>
                            e.key === "Escape" &&
                            (e.target as HTMLInputElement).blur()
                          }
                          className="mb-2"
                          autoFocus
                        />
                      </div>
                      {loadingMetadata ? (
                        <div className="p-4 text-center">
                          <Loader2 className="mx-auto h-6 w-6 animate-spin" />
                        </div>
                      ) : filteredMetadataOptions.length > 0 ? (
                        filteredMetadataOptions.map((meta) => (
                          <SelectItem key={meta.url} value={meta.url}>
                            {meta.name}
                          </SelectItem>
                        ))
                      ) : (
                        <div className="p-2 text-center text-sm text-muted-foreground">
                          Tidak ada metadata yang sesuai
                        </div>
                      )}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        {/* BUTTONS */}
        <div className="flex space-x-4 pt-4">
          <Button
            type="button"
            variant="secondary"
            className="bg-zinc-200 text-zinc-950"
            onClick={onPrevious}
          >
            Kembali
          </Button>
          <Button type="submit" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            {form.formState.isSubmitting ? "Menyimpan..." : "Lanjutkan"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
