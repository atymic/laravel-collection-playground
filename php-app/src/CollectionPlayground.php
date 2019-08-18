<?php

declare(strict_types=1);

namespace Atymic\CollectionPlayground;

use Atymic\CollectionPlayground\Exception\CollectionExecutionException;
use Atymic\CollectionPlayground\Exception\InvalidInputException;
use Tightenco\Collect\Support\Collection;

class CollectionPlayground
{
    public function evaluate(string $inputJson, string $collectionCode): string
    {
        try {
            $collection = $this->inputToCollection($inputJson);
            $result = eval($collectionCode);
        } catch (\Throwable $throwable) {
            $error = $this->formatThrowable($throwable);
        }

        if (isset($result) && $result instanceof Collection) {
            $result = $result->toArray();
        }

        return json_encode([
            'result' => $result ?? null,
            'error' => $error ?? null,
        ]);
    }

    private function inputToCollection(string $inputJson): Collection
    {
        $input = json_decode($inputJson, true, 512);

        if (json_last_error()) {
            throw new InvalidInputException(sprintf('Json Decode Error: %s', json_last_error_msg()), json_last_error());
        }

        if (!is_array($input)) {
            $input = [$input];
        }

        return collect($input);
    }

    private function formatThrowable(\Throwable $throwable): array
    {
        return [
            'type' => get_class($throwable),
            'message' => $throwable->getMessage(),
            'file' => $throwable->getFile(),
            'line' => $throwable->getLine(),
            'trace' => $throwable->getTraceAsString(),
        ];
    }

}
